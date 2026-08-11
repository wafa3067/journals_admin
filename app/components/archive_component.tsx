import Image from "next/image";
import { title } from "process";
import React from "react";
import CustomText from "./custom_text";
interface type {
  title: string;
  main: string;
  image: string;
}
type Props = {
  main: string;
  data: Array<type>;
};

const ArchiveComponent = (props: Props) => {
  return (
    <div className="m-5">
      <CustomText text={props.main} style={"font-bold text-2xl"} />
      <div className=" flex flex-row gap-5 p-5">
        {props.data.map((d) => (
          <div key={d.title}>
            {d.image && (
              <Image
                className="w-[200px] h-[120px] mb-3"
                src={d.image}
                alt="no image loaded"
                width={200}
                height={120}
              />
            )}
            {title && (
              <CustomText
                text={d.title ?? ""}
                style={"underline text-[#4b7d92] uppercase"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveComponent;
