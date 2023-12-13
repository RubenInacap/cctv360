import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { post_product } from '../api/productos';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const AddProductosPage = () => {
    const [nombre, setName] = useState<string>('');
    const [countInStock, setCountInStock] = useState<number>(0);
    const [categoria, setCategory] = useState<string>('');
    const [descripcion, setDescription] = useState<string>('');
    const [precio, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const addProdMutation = useMutation({
        mutationFn: post_product,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto Creado")
            navigate('/admin')
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
            console.error(error);
            navigate('/admin')
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validación básica del formulario
        if (!nombre || !categoria || !descripcion || !precio || !image) {
            toast.error("Por favor, completa todos los campos");
            return;
        }

        addProdMutation.mutate({
            nombre: nombre,
            contar_stock: countInStock,
            categoria: categoria,
            descripcion: descripcion,
            precio: precio,
            image: image,
        });

        close();
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valueName = event.target.value;
        if (valueName.length <= 25) {
          setName(valueName);
        } else {
          // Muestra un mensaje de advertencia o realiza alguna acción adicional
          console.log("¡El nombre no puede tener más de 100 caracteres!");
        }
      };
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valueName = event.target.value;
        if (valueName.length <= 300) {
          setDescription(valueName);
        } else {
          // Muestra un mensaje de advertencia o realiza alguna acción adicional
          console.log("La descripcion no puede tener más de 300 caracteres!");
        }
    };

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // Set countInStock to a maximum value of 1000

        const inputValue = event.target.value;
      
        // Verifica si el valor tiene más de 10 dígitos
        if (inputValue.length > 10) {
          console.log("Ingrese un máximo de 10 dígitos.");
          return;
        }
      
        const newNumber = parseInt(inputValue, 10);
      
        // Validación: Solo actualiza el estado si newNumber es un número positivo
        if (!isNaN(newNumber) && newNumber > 0) {
        setCountInStock(Math.min(newNumber, 1000));
        } else {
          // Puedes mostrar un mensaje de error o realizar alguna otra acción
          console.log("Ingrese un número válido y positivo.");
        }
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
      
        // Verifica si el valor tiene más de 10 dígitos
        if (inputValue.length > 8) {
          console.log("Ingrese un máximo de 10 dígitos.");
          return;
        }
      
        const newNumber = parseInt(inputValue, 10);
      
        // Validación: Solo actualiza el estado si newNumber es un número positivo
        if (!isNaN(newNumber) && newNumber > 0) {
          setPrice(newNumber);
        } else {
          // Puedes mostrar un mensaje de error o realizar alguna otra acción
          console.log("Ingrese un número válido y positivo.");
        }
      };



    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(false);
    };


    const removeImage = () => {
        setImage(null)
        setIsHovered(false)
    }

    if (addProdMutation.isLoading) return <Loader/>
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Agregar Producto
                            </h3>
                            <Link
                                to='/admin'
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Cerrar modal</span>
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        value={nombre}
                                        onChange={handleNameChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nombre del producto"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="count_in_stock"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Stock
                                    </label>
                                    <input
                                        value={countInStock}
                                        onChange={handleCountChange}
                                        type="number"
                                        name="count_in_stock"
                                        id="count_in_stock"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Stock de su producto"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Precio
                                    </label>
                                    <input
                                        value={precio}
                                        onChange={handlePriceChange}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Categoria
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={handleCategoryChange}
                                        name="category"
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        <option value="VIDEO">Camaras de Video</option>
                                        <option value="SEGURIDAD">Camaras de Seguridad</option>
                                        <option value="IMAGEN">Camaras FotoGraficas</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Descripcion
                                    </label>
                                    <input
                                        value={descripcion}
                                        onChange={handleDescriptionChange}
                                        id="description"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Escriba aquí la descripción del producto"
                                    ></input>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-center w-full">
                                        {image === null ? (
                                            <label
                                                htmlFor="dropzone-file"
                                                className={`flex flex-col items-center justify-center w-full h-64 
            border-2 border-gray-600 border-dashed rounded-lg 
            cursor-pointer bg-gray-40 ${isHovered ? "bg-gray-600" : "hover:bg-gray-600"
                                                    }`}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Haga clic para cargar
                                                        </span>{" "}
                                                        o arrastrar y soltar
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF (MAX.
                                                        800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    id="dropzone-file"
                                                    multiple={true}
                                                    onChange={handleFileChange}
                                                    className="absolute w-full h-[300px] opacity-0"
                                                />
                                            </label>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={removeImage}
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-toggle="defaultModal"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <span className="sr-only">
                                                        Cerrar modal
                                                    </span>
                                                </button>
                                                <img
                                                    className="h-48 w-96"
                                                    src={filePreview}
                                                    alt="Imagen seleccionada"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <svg
                                    className="mr-1 -ml-1 w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Añadir un nuevo producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProductosPage;