import { Link } from "react-router-dom";

const CatePage = () => {
  return (
    <div className="flex justify-center">
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">
        {/* Card 1 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/cate/SEGURIDAD`} className="block aspect-w-4 aspect-h-3">
            <img
                className="block w-full h-48 object-cover rounded-t-lg"
              src="/static/camaraSeguridad.png"
              alt=""
            />
          </Link>
          <div className="p-5">
            <Link to={`/cate/SEGURIDAD`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Camaras De Seguridad
              </h5>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/cate/VIDEO`} className="block aspect-w-4 aspect-h-3">
            <img
               className="block w-full h-48 object-cover rounded-t-lg"
              src="/static/camaraVideo.jpg"
              alt=""
            />
          </Link>
          <div className="p-5">
            <Link to={`/cate/VIDEO`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Camaras de Video
              </h5>
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/cate/IMAGEN`} className="block aspect-w-4 aspect-h-3">
            <img
               className="block w-full h-48 object-cover rounded-t-lg"
              src="/static/camaraFotografica.jpg"
              alt=""
            />
          </Link>
          <div className="p-5">
            <Link to={`/cate/IMAGEN`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Camaras FotoGraficas
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatePage;
