import CardBox from "../../shared/CardBox";
import Image from "next/image";

const userImg = [
  {
    user: "/images/profile/user-4.jpg",
  },
  {
    user: "/images/profile/user-2.jpg",
  },
  {
    user: "/images/profile/user-3.jpg",
  },
  {
    user: "/images/profile/user-6.jpg",
  },
];
const FigmaCard = () => {
  return (
    <>
      <CardBox className="overflow-hidden p-0">
        <Image src={"/images/backgrounds/blog.jpg"} alt="matdash" height={220} width={500} />
        <div className="p-6 pt-5">
          <h6 className="text-base">Figma tips and tricks with Stephan</h6>
          <p className="text-15 text-ld opacity-80 mt-3 leading-7">
            Nullam lobortis sodales dolor vitae viverra.<br></br>Cras lacinia
            bibendum metus vel rhoncus.
          </p>
          <div className="flex mt-4">
            {userImg.map((item, index) => (
              <div className="-ms-2  h-11 w-11" key={index}>
                <Image
                  src={item.user}
                  className="border-2 border-white dark:border-darkborder rounded-full"
                  alt="icon"
                  width={44}
                  height={44}
                />
              </div>
            ))}
            <div className="-ms-2 ">
              <div className="bg-lightprimary border-2 border-white dark:border-darkborder  h-11 w-11 flex justify-center items-center text-primary rounded-full dark:bg-lightprimary">
                +12
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default FigmaCard;
