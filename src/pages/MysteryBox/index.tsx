import User from 'components/User'
import { useEffect, useState } from 'react'
import MysteryBoxCard from './MysteryBoxCard'

function MysteryBox() {
  const [loading, setLoading] = useState<boolean>(false)
  const [mysteryBoxes, setMysteryBoxes] = useState<string[]>([])

  useEffect(() => {
    async function getMysteryBoxes() {
      setLoading(true)
      // Get mystery box
      setMysteryBoxes([
        'CryptoPunks#1',
        'Azuki#2',
        'MoonCats#3',
        'BoardingApe#6',
        'Doodle#129'
      ])
      setLoading(false)
    }
    getMysteryBoxes()
  }, [])

  return (
    <div className="relative w-screen h-screen flex flex-col items-center px-44 font-outfit overflow-x-hidden overflow-y-scroll">
      <User />
      <h1 className="font-bold text-4xl mt-36">Your Boxes</h1>
      {!loading ? (
        mysteryBoxes.length > 0 ? (
          <div className="w-full grid grid-cols-4 gap-6 my-10">
            {mysteryBoxes.map((mysteryBox, index) => (
              <div key={index} className="w-full bg-white">
                <MysteryBoxCard metadata={mysteryBox} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="-translate-y-10 text-lg">Empty</h1>
          </div>
        )
      ) : (
        <div className="w-full grid grid-cols-4 gap-6 my-10">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-200 shadow-lg rounded-2xl h-[50vh] overflow-hidden animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MysteryBox
