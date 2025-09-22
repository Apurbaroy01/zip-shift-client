import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddParcel = () => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const regionDistricts = {
    Dhaka: ["Gazipur", "Narayanganj", "Tangail"],
    Chittagong: ["Cox's Bazar", "Rangamati", "Khagrachari"],
    Sylhet: ["Moulvibazar", "Habiganj", "Sunamganj"],
  };

  useEffect(() => {
    if (parcelType === "document") {
      setValue("parcelWeight", "");
    }
  }, [parcelType, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

        {/* Sender & Receiver Flex/Grid */}
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-full md:w-auto mt-4">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
