import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import ConstellationPage from "./pages/ConstellationPage";
import StarPage from "./pages/StarPage";
import NorthStarPage from "./pages/NorthStarPage";
import TheLabPage from "./pages/TheLabPage";
import TransmissionsPage from "./pages/TransmissionsPage";
import TransmissionDetailPage from "./pages/TransmissionDetailPage";
import HailingFrequencyPage from "./pages/HailingFrequencyPage";
import CoordinatesPage from "./pages/CoordinatesPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "constellation/:slug", Component: ConstellationPage },
      { path: "star/:slug", Component: StarPage },
      { path: "the-north-star", Component: NorthStarPage },
      { path: "the-lab", Component: TheLabPage },
      { path: "the-lab/:section", Component: TheLabPage },
      { path: "transmissions", Component: TransmissionsPage },
      { path: "transmissions/:slug", Component: TransmissionDetailPage },
      { path: "hailing-frequency", Component: HailingFrequencyPage },
      { path: "coordinates", Component: CoordinatesPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
