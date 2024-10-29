import Image from 'next/image'
import AdminHome from '../app/admin/page'

export default function Home() {
  return (
    <main 
      className="p-0 m-0 bg-[url('/bg.jpg')] bg-cover h-screen bg-zinc-200 bg-blend-overlay font-semibold font-roboto"
      style={{ backgroundSize: "100% 140%" }}
    >
      {/* Fixed Top Navigation */}
      <div className="absolute top-0 w-full">
        <AdminHome />
      </div>

      {/* Centered Content */}
      <div className="flex items-center justify-center h-full">
        <div className='text-6xl font-bold font-roboto_mono'>
          e_Quiz Repository
        </div>
      </div>
    </main>
  )
}
