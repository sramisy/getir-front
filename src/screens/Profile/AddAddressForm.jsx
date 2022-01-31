import React from 'react';

import { Icon } from "@iconify/react";

import houseIcon from "../../assets/images/House.svg";


function AddAddressForm() {
    return (
        <div>
            <form>
                <div className="flex gap-x-3">
                    <div className="flex flex-shrink-0 items-center justify-between gap-x-3 border border-input-border rounded-md px-3 py-4">
                        <figure>
                            <img src={houseIcon} alt="House Icon" />
                        </figure>
                        <Icon
                            icon="akar-icons:chevron-down"
                            className="text-primary"
                            style={{ fontSize: "16px" }}
                        />
                    </div>
                    <div className="input-group has-floating-label">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="input-control"
                            placeholder="Title (Home, work)"
                            value="Home"
                        />
                        <label htmlFor="title" class="label-control">
                            Title (Home, work)
                        </label>
                    </div>
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="input-control"
                        placeholder="Address"
                        value="Alemdar Cad."
                    />
                    <label htmlFor="address" class="label-control">
                        Address
                    </label>
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input
                        type="text"
                        name="building"
                        id="building"
                        className="input-control"
                        placeholder="Building"
                    />
                    <label htmlFor="building" class="label-control">
                        Building
                    </label>
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input
                        type="text"
                        name="floor"
                        id="floor"
                        className="input-control"
                        placeholder="Floor"
                    />
                    <label htmlFor="floor" class="label-control">
                        Floor
                    </label>
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="input-control"
                        placeholder="Apt. No"
                    />
                    <label htmlFor="apartment" class="label-control">
                        Apt. No
                    </label>
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input
                        type="text"
                        name="direction"
                        id="direction"
                        className="input-control"
                        placeholder="Add Directions"
                    />
                    <label htmlFor="direction" class="label-control">
                        Add Directions
                    </label>
                </div>

                <button className="w-full bg-primary text-sm text-white font-semibold border-0 rounded-lg py-3 mt-6">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddAddressForm;
