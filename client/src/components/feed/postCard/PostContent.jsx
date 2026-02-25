import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const PostContent = ({ caption, images }) => {
  return (
    <div className="px-5 pb-4">
      <p className="text-sm text-gray-700 mb-4">{caption}</p>
      {images?.length > 0 && (
        <div
          className={`grid gap-2 ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {/* {images.map((img, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl">
              <img
                src={img}
                alt={`Post image ${index}`}
                className="w-full h-full object-cover aspect-square hover:scale-105 transition duration-300"
              />
            </div>
          ))} */}

          <PhotoProvider>
            {/* <div className="grid grid-cols-3 gap-2"> */}
              {images.slice(0, 6).map((img, index) => {
                const isLastVisible = index === 5 && images.length > 6;
                const remainingCount = images.length - 6;

                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <PhotoView src={img}>
                      <img
                        src={img}
                        alt={`Post image ${index}`}
                        className="w-full h-50 object-cover rounded-xl hover:scale-105 transition duration-300 cursor-pointer"
                      />
                    </PhotoView>

                    {/* Show +More only on 6th image */}
                    {isLastVisible && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl pointer-events-none">
                        <span className="text-white font-semibold text-sm">
                          +{remainingCount} more
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            {/* </div> */}
          </PhotoProvider>
        </div>
      )}
    </div>
  );
};

export default PostContent;
