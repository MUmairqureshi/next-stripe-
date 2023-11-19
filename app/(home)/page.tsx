import Image from 'next/image'
import HomeScene from "@/components/ui/home-scene"
import HomeIntroClouds from "@/components/ui/home-intro"
import HomePost from "@/components/ui/home-post"

export default async function Page() {
  return (
    <>
      <section className="intro desktop">
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
      <section className="scene desktop">
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
        <HomeScene/>
      </section>
      <div className="background desktop"></div>
      <section className="mobile mobile-view">
        <div className="container">
          <Image
            src="/home/home-badge.png"
            alt="hike clerb badge"
            width={200}
            height={210}
            className='badge-img'
          />
          <HomePost/>
          {/* <Image
            src="/home/home-post.svg"
            alt="hike clerb badge"
            width={230}
            height={520}
            className='post-img'
          /> */}
        </div>
      </section>
    </>
  );
}
