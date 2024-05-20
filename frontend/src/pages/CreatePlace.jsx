import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { categories, facilities, types } from "../configs/categories";
import {
  IoMdRemoveCircleOutline,
  IoMdAddCircleOutline,
  IoIosImage,
} from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import placeApi from "../apis/modules/place.api";
import { useNavigate } from "react-router-dom";

const basics = ["Guests", "Bedrooms", "Beds", "Bathrooms"];
const CreatePlace = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    province: "",
    country: "",
  });

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;

    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;

    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenties) =>
        prevAmenties.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prevAmenties) => [...prevAmenties, facility]);
    }
  };

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const placeForm = new FormData();
      placeForm.append("creator", creatorId);
      placeForm.append("category", category);
      placeForm.append("type", type);
      placeForm.append("streetAddress", formLocation.streetAddress);
      placeForm.append("aptSuite", formLocation.aptSuite);
      placeForm.append("city", formLocation.city);
      placeForm.append("province", formLocation.province);
      placeForm.append("country", formLocation.country);
      placeForm.append("guestCount", guestCount);
      placeForm.append("bedroomCount", bedroomCount);
      placeForm.append("bedCount", bedCount);
      placeForm.append("bathroomCount", bathroomCount);
      placeForm.append("title", formDescription.title);
      placeForm.append("description", formDescription.description);
      placeForm.append("highlight", formDescription.highlight);
      placeForm.append("highlightDesc", formDescription.highlightDesc);
      placeForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        placeForm.append("listingPhotos", photo);
      });

      amenities.forEach((amenity) => {
        placeForm.append("amenities", amenity);
      });
      console.log(formLocation);
      const response = await placeApi.createPlace(placeForm);

      if (response.status === 200) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 px-32 pt-10 pb-14">
        <h1 className="text-slate-800 text-4xl font-medium">
          Publish Your Place
        </h1>
        <form onSubmit={handlePost}>
          <div className="bg-white px-10 py-8 rounded-3xl mt-10 sm:px-5 sm:py-8">
            <h2 className="text-blue-400 text-2xl font-medium">
              Step 1: Tell us about you
            </h2>
            <hr className="mt-[15px] mb-[25px]" />
            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              Which of these categories best describes your place?
            </h3>
            <div className="flex justify-center items-center flex-wrap gap-5 px-5 lg:px-5 md:p-0">
              {categories?.map((item, index) => (
                <div
                  className={`flex flex-col justify-center items-center w-[110px] h-[90px] border border-solid rounded-xl cursor-pointer duration-200 ease-in  hover:border-2 hover:border-blue-300 hover:bg-gray-100 ${
                    category === item.label
                      ? "border-2 border-solid border-blue-300 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="text-3xl text-black">{item.icon}</div>
                  <p className="font-semibold text-center text-black">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              What type of place will guests have?
            </h3>
            <div className="flex flex-col gap-5">
              {types?.map((item, index) => (
                <div
                  className={`flex justify-between items-center max-w-[600px] px-[30px] py-[15px] border rounded-xl cursor-pointer duration-300 ease-in  hover:border-2 hover:border-blue-300 hover:bg-gray-100 ${
                    type === item.name
                      ? "border-2 border-blue-300 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="max-w-[400px]">
                    <h4 className="mb-[5px] text-xl">{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="text-3xl text-black">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              Where your place located?
            </h3>
            <div className="max-w-[700px]">
              <div className="location">
                <p className="font-semibold mt-5 mb-[10px]">Street Address</p>
                <input
                  className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[100%] focus:outline-none"
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="max-w-[700px] grid grid-cols-1-1 gap-10 ml:flex ml:flex-col ml:gap-0">
              <div className="location">
                <p className="font-semibold mt-5 mb-[10px]">
                  Apartment, Suite, etc. (if applicable)
                </p>
                <input
                  className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[100%] focus:outline-none"
                  type="text"
                  placeholder="Apt, Suite, etc, (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p className="font-semibold mt-5 mb-[10px]">City</p>
                <input
                  className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[100%] focus:outline-none"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="max-w-[700px] grid grid-cols-1-1 gap-10 ml:flex ml:flex-col ml:gap-0">
              <div className="location">
                <p className="font-semibold mt-5 mb-[10px]">Province</p>
                <input
                  className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[100%] focus:outline-none"
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p className="font-semibold mt-5 mb-[10px]">Country</p>
                <input
                  className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[100%] focus:outline-none"
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              Share some basics about your place
            </h3>
            <div className="flex flex-wrap gap-10">
              <div className="flex items-center gap-[30px] p-[15px] border border-gray-400 rounded-xl">
                <p className="font-semibold">Guests</p>
                <div className="flex items-center gap-2 text-xl">
                  <IoMdRemoveCircleOutline
                    onClick={() =>
                      guestCount > 1 && setGuestCount(guestCount - 1)
                    }
                    className="cursor-pointer"
                  />
                  <p>{guestCount}</p>
                  <IoMdAddCircleOutline
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[30px] p-[15px] border border-gray-400 rounded-xl">
                <p className="font-semibold">Bedrooms</p>
                <div className="flex items-center gap-2 text-xl">
                  <IoMdRemoveCircleOutline
                    onClick={() =>
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                    }
                    className="cursor-pointer"
                  />
                  <p>{bedroomCount}</p>
                  <IoMdAddCircleOutline
                    onClick={() => setBedroomCount(bedroomCount + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[30px] p-[15px] border border-gray-400 rounded-xl">
                <p className="font-semibold">Beds</p>
                <div className="flex items-center gap-2 text-xl">
                  <IoMdRemoveCircleOutline
                    onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                    className="cursor-pointer"
                  />
                  <p>{bedCount}</p>
                  <IoMdAddCircleOutline
                    onClick={() => setBedCount(bedCount + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[30px] p-[15px] border border-gray-400 rounded-xl">
                <p className="font-semibold">Bathrooms</p>
                <div className="flex items-center gap-2 text-xl">
                  <IoMdRemoveCircleOutline
                    onClick={() =>
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                    }
                    className="cursor-pointer"
                  />
                  <p>{bathroomCount}</p>
                  <IoMdAddCircleOutline
                    onClick={() => setBathroomCount(bathroomCount + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-10 py-[30px] rounded-3xl mt-10 sm:px-5 sm:py-[30px]">
            <h2 className="text-blue-300 text-2xl font-medium">
              Step 2: Make your place stand out
            </h2>
            <hr className="mt-[15px] mb-[25px]" />
            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              Tell guests what your place has to offer
            </h3>
            <div className="flex flex-wrap gap-5">
              {facilities?.map((item, index) => (
                <div
                  className={`flex flex-col justify-center items-center w-[200px] h-[90px] border rounded-xl cursor-pointer duration-200 ease-in hover:border-2 hover:border-blue-300 hover:bg-gray-100 ${
                    amenities.includes(item.name)
                      ? "border-2 border-blue-300 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <p className="font-semibold">{item.name}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              Add some photos of your place
            </h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-[15px] "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-400 px-[100px] py-[40px] rounded-xl mm:px-20 mm:py-10 sm:px-[30px] sm:py-10"
                        >
                          <div className="text-6xl">
                            <IoIosImage />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="relative w-[250px] h-[150px] cursor-move"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    className="w-[100%] h-[100%]"
                                    src={URL.createObjectURL(photo)}
                                    alt="Place"
                                  />
                                  <button
                                    className="absolute right-0 top-0 p-[3px] border-none bg-[rgba(255,255,255,0.8)] text-xl cursor-pointer hover:text-blue-300"
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-400 w-[250px] h-[150px]"
                        >
                          <div className="text-6xl">
                            <IoIosImage />
                          </div>
                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3 className="mt-10 mb-[20px] text-slate-700 text-xl font-medium">
              What make your place attractive and exciting?
            </h3>
            <div className="description">
              <p className="font-bold mt-5 mb-[10px]">Title</p>
              <input
                className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[600px] ml:w-[450px] md:w-[350px] sm:w-[280px] focus:outline-none"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChangeDescription}
                required
              />
              <p className="font-bold mt-5 mb-[10px]">Description</p>
              <input
                className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[600px] ml:w-[450px] md:w-[350px] sm:w-[280px] focus:outline-none"
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChangeDescription}
                required
              />
              <p className="font-bold mt-5 mb-[10px]">Highlight</p>
              <input
                className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[600px] ml:w-[450px] md:w-[350px] sm:w-[280px] focus:outline-none"
                type="text"
                placeholder="Highlight"
                name="highlight"
                onChange={handleChangeDescription}
                required
              />
              <p className="font-bold mt-5 mb-[10px]">Highlight details</p>
              <textarea
                className="border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold w-[600px] ml:w-[450px] md:w-[350px] sm:w-[280px] focus:outline-none"
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                onChange={handleChangeDescription}
                required
              />
              <p className="font-bold mt-5 mb-[10px]">Now, set your price</p>
              <span className="text-2xl font-bold mr-5">$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="w-[200px] border border-gray-400 px-[30px] py-[15px] rounded-xl text-base font-semibold focus:outline-none"
                onChange={handleChangeDescription}
                required
              />
            </div>
          </div>

          <button
            className="mt-10 ml-10 bg-blue-400 text-white p-[15px] rounded-xl"
            type="submit"
          >
            Create Your Place
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePlace;
