import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa'

export default function Products() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/products');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        price: '',
        description: ''
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: value
        }));
    };

    const handleCancel = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFormData({
            price: '',
            description: ''
        });
    }

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!file || !formData.price || !formData.description){
            alert('Please input all fields');
            return;
        }

        const data = new FormData();
        data.append('product_image', file);
        data.append('price', formData.price);
        data.append('description', formData.description);

        try {
            const res = await fetch('http://localhost:5000/products', {
                method: 'POST',
                credentials: 'include',
                body: data
            });
            const result = await res.json();
            console.log(result);
            
            setImage(null);
            setFile(null);
            setFormData({
                price: '',
                description: ''
            });

        } catch (err) {
            console.error(err);
        };

    };
    
    return (
    <>
    
    <div className='h-full w-full grid'>
        <form
            onSubmit={handlePublish}
            className="w-full h-full flex flex-col gap-5">
            {/* Upload Button */}
            <div className="flex items-center gap-2">
                <label
                htmlFor="productImage"
                className="w-10 h-10 flex items-center justify-center
                            bg-blue-100 rounded-full
                            hover:bg-blue-200 transition cursor-pointer"
                >
                <FaPlus className="text-blue-600 text-sm" />
                </label>
                <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                />
                <p>Add your products</p>
            </div>
            {/* Preview Section */}
            {image && (
                <div className="w-100 flex flex-col items-center gap-4 p-4 border rounded-lg bg-blue-100">
                <p className="font-semibold">Preview</p>
                <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                />
                <div className="w-full border flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-md max-w-md">
                    {/* Price */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">
                        Price
                        </label>
                        <input
                        type="number"
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        className="px-4 py-2 border rounded-lg
                                    focus:outline-none focus:ring-2
                                    focus:ring-blue-500 transition"
                        />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">
                        Description
                        </label>
                        <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write product description..."
                        rows="3"
                        className="px-4 py-2 border rounded-lg
                                    focus:outline-none focus:ring-2
                                    focus:ring-blue-500 transition resize-none"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                    Publish
                    </button>
                </div>
                </div>
            )}
            {/* Products List */}
            <div className="flex items-center gap-2 mt-5">
                <FaBox className="text-blue-600 ml-3" />
                <p className="ml-3">Your products</p>
            </div>
        </form>
        <div className="flex flex-wrap gap-6 mt-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="w-45 bg-white rounded-2xl shadow-md overflow-hidden border"
                >
                    <img
                        src={`http://localhost:5000/${product.product_image}`}
                        alt="product"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-lg font-bold">
                            ${product.price}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>


    </>
  );
}