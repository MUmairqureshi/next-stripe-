import Image from 'next/image'

export default async function Page() {
  return (
    <>
      {/* <header className="w-[5rem] bg-sub-bg rounded-md p-2 shadow-small-shadow">
        <h3>Bar</h3>
      </header>
      <div className="w-[25rem] bg-sub-bg rounded-md p-2 shadow-small-shadow">
        <h3>Management Bar</h3>
      </div>
      <div className="flex-1 bg-sub-bg rounded-md p-2 shadow-small-shadow">
        <h3>Contents</h3>
      </div> */}
      <section className="intro">
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
          className='mountains-back-img'
          id='mountains-back-img'
        />
        
         <Image
          src="/home/mountains-front.svg"
          alt="mountains"
          width={1800}
          height={1200}
          className='mountains-front-img'
          id='mountains-front-img'
        />
         
        <Image
          src="/home/hills.svg"
          alt="hike clerb girls hiking"
          width={1800}
          height={1200}
          className='hike-clerb'
          id='hike-clerb'
        />
      </section>

      <div className="background"></div>

      
    </>
  );
}
