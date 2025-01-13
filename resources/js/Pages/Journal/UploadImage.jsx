import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UploadForm = ({ auth }) => {
    const [fileExists, setFileExists] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data, setData, post, progress } = useForm({
        images: [],
    });

    const { images, finishUpload } = usePage().props;
    useEffect(() => {
        if (images) {
            setFileExists(images);
        }
    }, [images]);

    // Fungsi untuk menangani file yang dipilih
    const handleFileChange = (e) => {
        const files = e.target.files;
        const existingFiles = data.images ? [...data.images] : [];

        // Menyiapkan preview gambar untuk ditampilkan
        const previews = [];
        console.log("Files to upload:", files.length); // Log jumlah file yang dipilih

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                console.log(`File ${i + 1} read successfully`); // Log saat file selesai dibaca
                previews.push(reader.result);

                // Cek jika semua file telah diproses
                if (previews.length === files.length) {
                    console.log("All files processed:", previews);

                    // Menambahkan file baru ke dalam state filePreviews yang sudah ada
                    setFilePreviews((prev) => [...prev, ...previews]); // Gabungkan dengan file yang
                    //  sudah ada
                    setData("images", [...existingFiles, ...files]);
                    console.log("Updated data.images:", [
                        ...existingFiles,
                        ...files,
                    ]);
                }
            };

            reader.onerror = () => {
                console.error(`Error reading file ${i + 1}`);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (index) => {
        // Hapus dari preview
        setFilePreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index)
        );

        // Hapus dari data.images
        const updatedFiles = Array.from(data.images);
        updatedFiles.splice(index, 1);

        // Update state untuk data.images
        setData("images", updatedFiles);
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.images && data.images.length > 0) {
            post(route("images.upload"), {
                onFinish: () => {
                    setFilePreviews([]);
                    setData("images", []); // Reset images setelah upload selesai
                    Swal.fire({
                        title: "Success!",
                        text: "Gambar sudah berhasil diupload!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            });
        } else {
            // Tampilkan SweetAlert jika tidak ada file yang dipilih
            Swal.fire({
                title: "Error!",
                text: "Pilih setidaknya 1 gambar.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleConfirmation = (e) => {
        e.preventDefault(); // Mencegah navigasi langsung

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Jika melanjutkan, isian jurnal tidak bisa diubah!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, lanjutkan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(route("finish"));
            }
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Upload Bukti
                </h2>
            }
        >
            <Head title="Upload Bukti" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl px-6 sm:px-10 py-8">
                        <div className="mb-4">
                            <h2 className="font-semibold text-xl">
                                Upload Gambar
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                                {fileExists.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer"
                                        onClick={() => setSelectedImage(image)} // Klik untuk melihat full screen
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={`uploaded-${index}`}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal untuk melihat gambar full-screen */}
                        {selectedImage && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                                onClick={() => setSelectedImage(null)}
                            >
                                <div className="relative">
                                    <img
                                        src={`/storage/${selectedImage.image_path}`}
                                        alt="full-screen"
                                        className="max-w-full max-h-screen p-12"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="bg-red-600 p-2 mt-1 rounded-full absolute top-2 right-2 text-white text-3xl"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {!finishUpload || !finishUpload.completed ? (
                            <form onSubmit={submit}>
                                {/* Dropzone for File Upload */}
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                {/* Preview Files */}
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {filePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`preview-${index}`}
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                {progress && (
                                    <div>
                                        <span
                                            id="ProgressLabel"
                                            className="sr-only"
                                        >
                                            Loading
                                        </span>

                                        <span
                                            role="progressbar"
                                            aria-labelledby="ProgressLabel"
                                            aria-valuenow={progress.percentage}
                                            className="block rounded-full bg-gray-200"
                                            style={{ width: "100%" }} // Atur lebar 100% untuk container
                                        >
                                            <span
                                                className="block h-4 rounded-full bg-indigo-600 text-center text-[10px]/4"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }} // Dinamis sesuai dengan progress
                                            >
                                                <span className="font-bold text-white">
                                                    {progress.percentage}%
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="mt-4 inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Kirim Bukti
                                </button>
                            </form>
                        ) : (
                            <div className="w-full mt-4">
                                <div className="flex justify-between p-4 rounded-md bg-green-50 border border-green-300">
                                    <div className="flex items-start gap-3 w-full">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1 self-center">
                                            <span className="text-green-600 font-medium">
                                                Anda telah selesai
                                            </span>
                                            <div className="text-green-600">
                                                <p className="mt-2 sm:text-sm">
                                                    Anda telah mengupload bukti
                                                    gambar.
                                                </p>
                                            </div>
                                        </div>
                                        <button className="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5 text-green-600"
                                            >
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end mt-3">
                            {!finishUpload || !finishUpload.completed ? (
                                <button
                                    onClick={handleConfirmation}
                                    className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
                                >
                                    Selesai
                                </button>
                            ) : (
                                <Link
                                    href={route("finish")}
                                    className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
                                >
                                    Selanjutnya
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UploadForm;
