import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import useAxiosSecoure from "../../Hook/useAxiosSecoure";
import Swal from "sweetalert2";


const AddParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [price, setPrice] = useState(0);

  const axiosSecure = useAxiosSecoure();


  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelWeight = watch("parcelWeight");

  const regionDistricts = {
    Dhaka: ["Gazipur", "Narayanganj", "Tangail"],
    Chittagong: ["Cox's Bazar", "Rangamati", "Khagrachari"],
    Sylhet: ["Moulvibazar", "Habiganj", "Sunamganj"],
  };

  // Reset weight if document
  useEffect(() => {
    if (parcelType === "document") {
      setValue("parcelWeight", "");
    }
  }, [parcelType, setValue]);

  // Price Calculation Logic
  useEffect(() => {
    let calculatedPrice = 0;

    // Determine if inside same region or not
    const withinCity = senderRegion && receiverRegion && senderRegion === receiverRegion;

    if (parcelType === "document") {
      calculatedPrice = withinCity ? 60 : 80;
    } else if (parcelType === "not-document") {
      const weight = Number(parcelWeight) || 0;

      if (weight <= 3) {
        calculatedPrice = withinCity ? 110 : 150;
      } else {
        // Base price + extra
        const extraKg = weight - 3;
        if (withinCity) {
          calculatedPrice = 110 + extraKg * 40;
        } else {
          calculatedPrice = 150 + extraKg * 40 + 40; // extra +40 for outside city
        }
      }
    }

    setPrice(calculatedPrice);
  }, [parcelType, parcelWeight, senderRegion, receiverRegion]);


  const generateTrackingId = () => {
    const now = Date.now(); // সময় মিলিসেকেন্ডে
    const random = Math.floor(Math.random() * 1000); // 0-999 র‍্যান্ডম সংখ্যা
    return `TRK-${now}-${random}`;
  };


  const onSubmit = (data) => {

    const parcelData = {
      email: user.email,
      price,
      creation_Date: new Date().toISOString(),
      payment_status: "unpaid",
      delevery_status: "not_collected",
      trackigId: generateTrackingId(),
      ...data,

    }
    console.log("Form Data:", parcelData);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.post("/parcels", parcelData)

          .then(res => {
            console.log(res.data)
            Swal.fire({
              title: "success",
              text: "Your parcel has been success.",
              icon: "success"
            });

          })
          .catch((error) => {
            console.log(error.message)
          })


      }
    });

  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Parcel</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Type */}
        <div className="flex gap-6">
          <label>
            <input type="radio" value="document" {...register("parcelType")} /> Document
          </label>
          <label>
            <input type="radio" value="not-document" {...register("parcelType")} /> Not-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Name"
            {...register("parcelName")}
            className="input input-bordered w-full"
          />

          <input
            type="number"
            placeholder="Parcel Weight (KG)"
            {...register("parcelWeight")}
            disabled={parcelType === "document"}
            className="input input-bordered w-full"
          />
        </div>

        {/* Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h2 className="font-semibold mb-2">Sender</h2>
            <input
              type="text"
              placeholder="Sender Name"
              {...register("senderName")}
              className="input input-bordered w-full mb-2"
            />

            <select {...register("senderRegion")} className="select select-bordered w-full mb-2">
              <option value="">Select Region</option>
              {Object.keys(regionDistricts).map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>

            <select
              {...register("senderDistrict")}
              className="select select-bordered w-full"
              disabled={!senderRegion}
            >
              <option value="">Select District</option>
              {regionDistricts[senderRegion]?.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="font-semibold mb-2">Receiver</h2>
            <input
              type="text"
              placeholder="Receiver Name"
              {...register("receiverName")}
              className="input input-bordered w-full mb-2"
            />

            <select {...register("receiverRegion")} className="select select-bordered w-full mb-2">
              <option value="">Select Region</option>
              {Object.keys(regionDistricts).map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>

            <select
              {...register("receiverDistrict")}
              className="select select-bordered w-full"
              disabled={!receiverRegion}
            >
              <option value="">Select District</option>
              {regionDistricts[receiverRegion]?.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Section */}
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Delivery Charge</h3>
          <p className="text-xl font-bold text-green-600">৳ {price || 0}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-full md:w-auto mt-4">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
