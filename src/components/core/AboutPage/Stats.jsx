import React from "react";

const data = [
  { count: "5k", label: "Active students" },
  { count: "10+", label: "Mentors" },
  { count: "100+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

export default function Stats() {
  return ( 
    <section className="mt-10 mb-10">
      <div>
        <div className="mt-10 gap-x-32 text-white w-full flex items-center">
          {data.map((data, index) => {
            return (
              <div key={index} className="text-white">
                <h1>{data.count}</h1>
                <h2>{data.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
