import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from "next/navigation";

// Parameters
// data: {
//   title: "Home",
//   icon: IoIosArrowForward, (react-icons)
//   submenu: [
//     {
//       title: "menu 1",
//       href: "/admin",
//     },
//     {
//       title: "menu 2",
//       href: "/",
//     },
//   ],
// };

// isSelected: state for selected menu manage
// setIsSelected: change that state
// pathToActive: pathname for the menu to be selected (full_url: http://localhost:3000/admin/home/page-1, pathname:home)

export default function NavDropdown({
  data,
  isSelected,
  setIsSelected,
  pathToActive,
}) {
  const fakeData = {
    title: "Home",
    icon: IoIosArrowForward,
    submenu: [
      {
        title: "menu 1",
        href: "/admin",
      },
      {
        title: "menu 2",
        href: "/",
      },
    ],
  };
  const pathname = usePathname();
  return (
    <>
      <div>
        <li
          className="w-full cursor-pointer"
          onClick={() =>
            setIsSelected((prev) => (prev == data.title ? "" : data.title))
          }
        >
          <div
            className={`flex items-center gap-2 py-2 px-3 text-white group w-full uppercase shadow-sm${
              pathname.split("/")[2] === pathToActive
                ? "border-e-2 border-white"
                : ""
            }`}
          >
            <data.icon className="group-hover:scale-[1.4] transition-all duration-300 text-lg" />
            <p>{data.title}</p>
            <IoIosArrowForward
              className={isSelected === data.title ? "rotate-90" : "rotate-0"}
            />
          </div>
        </li>

        <li
          className={`mt-2 ml-4 ${
            isSelected === data.title ? "visible" : "hidden"
          }`}
        >
          <ul className="ps-5 space-y-2">
            {data.submenu.map((item, i) => (
              <Link className="text-white" href={item.href} key={i}>
                <li className="mb-2">{item.title}</li>
              </Link>
            ))}
          </ul>
        </li>
      </div>
    </>
  );
}
