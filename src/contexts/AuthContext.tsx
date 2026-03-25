import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import api from '../config/api'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  updateUser: (userData: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to store the Firebase ID token
const storeToken = async (fbUser: FirebaseUser) => {
  try {
    const token = await getIdToken(fbUser)
    localStorage.setItem('firebase_id_token', token)
    return token
  } catch (error) {
    console.error('Failed to get ID token:', error)
    return null
  }
}

// Helper to sync user with backend database
const syncUserToBackend = async (fbUser: FirebaseUser): Promise<User | null> => {
  try {
    const nameParts = fbUser.displayName?.split(' ') || []
    const firstName = nameParts[0] || fbUser.email?.split('@')[0] || 'User'
    const lastName = nameParts.slice(1).join(' ') || ''
    
    const response = await api.post('/users/sync', {
      firebaseUid: fbUser.uid,
      email: fbUser.email,
      firstName,
      lastName,
    })
    
    // Return the synced user data from backend
    return {
      id: response.data.id,
      name: `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim() || response.data.email.split('@')[0],
      email: response.data.email,
      phone: response.data.phone || localStorage.getItem(`user_phone_${fbUser.uid}`) || '',
      address: response.data.address || localStorage.getItem(`user_address_${fbUser.uid}`) || '',
      role: response.data.role,
    }
  } catch (error) {
    console.error('Failed to sync user to backend:', error)
    // Return a fallback user object if sync fails
    return {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      email: fbUser.email || '',
      phone: localStorage.getItem(`user_phone_${fbUser.uid}`) || '',
      address: localStorage.getItem(`user_address_${fbUser.uid}`) || '',
    }
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        
        // Store the Firebase ID token for API calls
        await storeToken(fbUser)
        
        // Sync user to backend database (creates user if not exists)
        const syncedUser = await syncUserToBackend(fbUser)
        setUser(syncedUser)
        
        // Store email for order tracking
        localStorage.setItem('customerEmail', fbUser.email || '')
      } else {
        setFirebaseUser(null)
        setUser(null)
        localStorage.removeItem('firebase_id_token')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Refresh token periodically (every 50 minutes, as Firebase tokens expire in 1 hour)
  useEffect(() => {
    if (!firebaseUser) return

    const refreshToken = async () => {
      await storeToken(firebaseUser)
    }

    const interval = setInterval(refreshToken, 50 * 60 * 1000) // 50 minutes
    return () => clearInterval(interval)
  }, [firebaseUser])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const fbUser = userCredential.user
      
      // Store the Firebase ID token for API calls
      await storeToken(fbUser)
      
      // Sync user to backend database
      const syncedUser = await syncUserToBackend(fbUser)
      setUser(syncedUser)
      
      localStorage.setItem('customerEmail', email)
      
      return true
    } catch (error: any) {
      console.error('Login error:', error.message)
      return false
    }
  }

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const fbUser = userCredential.user
      
      // Update display name in Firebase
      await updateProfile(fbUser, { displayName: name })
      
      // Store the Firebase ID token for API calls
      await storeToken(fbUser)
      
      // Store phone locally
      if (phone) {
        localStorage.setItem(`user_phone_${fbUser.uid}`, phone)
      }
      
      // Sync user to backend database (this creates the user in DB)
      const syncedUser = await syncUserToBackend(fbUser)
      if (syncedUser) {
        syncedUser.phone = phone || syncedUser.phone
      }
      setUser(syncedUser)
      
      localStorage.setItem('customerEmail', email)
      
      return true
    } catch (error: any) {
      console.error('Registration error:', error.message)
      return false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setFirebaseUser(null)
      localStorage.removeItem('firebase_id_token')
      localStorage.removeItem('customerEmail')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (user && firebaseUser) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      
      // Store phone and address in localStorage (per user)
      if (userData.phone !== undefined) {
        localStorage.setItem(`user_phone_${firebaseUser.uid}`, userData.phone || '')
      }
      if (userData.address !== undefined) {
        localStorage.setItem(`user_address_${firebaseUser.uid}`, userData.address || '')
      }
      
      // Update Firebase display name if name changed
      if (userData.name && userData.name !== firebaseUser.displayName) {
        await updateProfile(firebaseUser, { displayName: userData.name })
      }
      
      // Sync updated profile to backend
      try {
        await api.put('/users/me', {
          firstName: userData.name?.split(' ')[0],
          lastName: userData.name?.split(' ').slice(1).join(' '),
          phone: userData.phone,
          address: userData.address,
        })
      } catch (error) {
        console.error('Failed to update profile in backend:', error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        updateUser,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
