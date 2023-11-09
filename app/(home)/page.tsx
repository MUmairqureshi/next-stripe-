import Image from 'next/image'
import HomeScene from "@/components/ui/home-scene"
import HomeIntroClouds from "@/components/ui/home-intro"

export default async function Page() {
  return (
    <>
      <section className="intro">
        <HomeIntroClouds/>
        <Image
          src="/home/intro.svg"
          alt="hike clerb badge and some clouds"
          width={1800}
          height={1200}
          className='intro-img'
          id='intro-img'
        />
      </section>
      <section className="scene">
        <Image
          src="/home/mountains-back.svg"
          alt="mountains"
          width={1800}
          height={1200}
          className='mountains-back-img img'
          id='mountains-back-img'
        />
        
         <Image
          src="/home/mountains-front.svg"
          alt="mountains"
          width={1800}
          height={1200}
          className='mountains-front-img img'
          id='mountains-front-img'
        />
        
        <Image
          src="/home/hills.svg"
          alt="hike clerb girls hiking"
          width={3063}
          height={984}
          className='hills img'
          id='hills'
        />
        
        {/* <Image
          src="/home/scene.svg"
          alt="hike clerb girls hiking"
          width={3063}
          height={984}
          className='hike-clerb img'
          id='hike-clerb'
        /> */}

        <HomeScene/>
      </section>

      <div className="background"></div>
    </>
  );
}
