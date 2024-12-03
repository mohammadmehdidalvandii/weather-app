import AddLocation from "./page/AddLocation/AddLocation";
import Weather from "./page/Weather/Weather";

const routes = [
    {path:"/" , element:<AddLocation/>},
    {path:"/Weather" , element:<Weather/>}
];

export default routes