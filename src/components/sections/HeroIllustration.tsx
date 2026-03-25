const HeroIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-end justify-center">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-20 h-10 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-16 right-20 w-16 h-8 bg-white rounded-full opacity-80"></div>
        
        {/* Mountains in background */}
        <div className="absolute bottom-32 left-0 right-0">
          <svg viewBox="0 0 400 200" className="w-full h-32">
            <path
              d="M0,200 L100,120 L200,160 L300,100 L400,140 L400,200 Z"
              fill="#86efac"
              opacity="0.6"
            />
            <path
              d="M0,200 L150,100 L300,140 L400,100 L400,200 Z"
              fill="#4ade80"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Wind Turbines */}
        <div className="absolute bottom-40 left-20">
          <div className="relative">
            {/* Tower */}
            <div className="w-2 h-24 bg-gray-300 mx-auto"></div>
            {/* Blades */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16">
              <div className="absolute top-0 left-1/2 w-1 h-8 bg-gray-400 transform -translate-x-1/2 rotate-45 origin-bottom"></div>
              <div className="absolute top-0 left-1/2 w-1 h-8 bg-gray-400 transform -translate-x-1/2 rotate-165 origin-bottom"></div>
              <div className="absolute top-0 left-1/2 w-1 h-8 bg-gray-400 transform -translate-x-1/2 rotate-285 origin-bottom"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-36 right-32">
          <div className="relative">
            <div className="w-2 h-20 bg-gray-300 mx-auto"></div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12">
              <div className="absolute top-0 left-1/2 w-1 h-6 bg-gray-400 transform -translate-x-1/2 rotate-60 origin-bottom"></div>
              <div className="absolute top-0 left-1/2 w-1 h-6 bg-gray-400 transform -translate-x-1/2 rotate-180 origin-bottom"></div>
              <div className="absolute top-0 left-1/2 w-1 h-6 bg-gray-400 transform -translate-x-1/2 rotate-300 origin-bottom"></div>
            </div>
          </div>
        </div>

        {/* House with Solar Panels */}
        <div className="absolute bottom-0 right-10">
          <div className="relative">
            {/* House base */}
            <div className="w-32 h-24 bg-green-200 relative">
              {/* Windows */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 border-2 border-white"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-200 border-2 border-white"></div>
              {/* Door */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-green-700"></div>
            </div>
            {/* Roof with Solar Panels */}
            <div className="absolute -top-8 left-0 w-32 h-12 bg-green-600">
              {/* Solar panels grid */}
              <div className="grid grid-cols-4 gap-1 p-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-blue-600 h-4"></div>
                ))}
              </div>
            </div>
            {/* Tree */}
            <div className="absolute -bottom-4 -left-8">
              <div className="w-12 h-16 bg-green-700 rounded-full"></div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hills/ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg viewBox="0 0 400 100" className="w-full h-full">
            <path
              d="M0,100 Q100,60 200,80 T400,70 L400,100 Z"
              fill="#22c55e"
            />
            <path
              d="M0,100 Q150,50 300,70 L400,65 L400,100 Z"
              fill="#16a34a"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeroIllustration

