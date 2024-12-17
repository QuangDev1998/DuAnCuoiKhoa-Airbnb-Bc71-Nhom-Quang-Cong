import React from "react";
import { useNavigate } from "react-router-dom";

export default function Locations() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Toàn bộ nhà",
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75",
    },
    {
      id: 3,
      title: "Chỗ ở độc đáo",
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75",
    },
    {
      id: 7,
      title: "Trang trại và thiên nhiên",
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75",
    },
    {
      id: 6,
      title: "Cho phép mang theo thú cưng",
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75",
    },
  ];

  const handleNavigate = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="container mx-auto py-10 ">
      <h1 className="text-3xl font-bold mb-6">Ở bất cứ đâu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 duration-300 ">
        {cards.map((card) => (
          <div
            data-aos="flip-right"
            key={card.id}
            className="cursor-pointer border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            onClick={() => handleNavigate(card.id)}
            style={{ height: "450px" }}
          >
            {/* Phần ảnh */}
            <div style={{ height: "80%" }}>
              {" "}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="p-8 text-center"
              style={{ height: "20%", backgroundColor: "white" }}
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
