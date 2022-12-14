import MysteryBoxImage from 'assets/mystery_box.jpeg'

interface MysteryBoxCardProps {
  metadata: string
}

function MysteryBoxCard({ metadata }: MysteryBoxCardProps) {
  return (
    <div className="shadow-button rounded-2xl h-[50vh] overflow-hidden flex flex-col items-center font-outfit text-black">
      <img
        src={MysteryBoxImage}
        alt="mystery box"
        className="w-full h-[280px] object-cover mb-5"
      />

      <div className='font-semibold text-[32px] leading-10 mb-11'>{metadata}</div>

      <button className='w-[120px] h-[40px] flex items-center justify-center rounded-[20px] border-[1px] border-black font-bold text-base leading-5 hover:scale-105 duration-300 hover:bg-slate-200'>Open</button>
    </div>
  )
}

export default MysteryBoxCard
