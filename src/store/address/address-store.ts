import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        countryId: string;
        phone: string;
    };

    setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
    persist(
        ( set, get) => ({
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                countryId: '',
                phone: '',
            },
            setAddress: (address: State['address']) => {
                set({ address });
            }
        }),
        {
            name: 'address-storage'
        }
    )
);