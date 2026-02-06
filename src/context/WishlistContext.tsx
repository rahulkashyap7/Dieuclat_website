import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (product: any) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    clearWishlist: () => void;
    isWishlistOpen: boolean;
    setIsWishlistOpen: (isOpen: boolean) => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const savedWishlist = localStorage.getItem('dieuclat_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('dieuclat_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: any) => {
        setWishlist((prevWishlist) => {
            const existingItem = prevWishlist.find((item) => item.id === product.id);
            if (existingItem) {
                // If it exists, we might want to remove it (toggle behavior)
                // but for now let's just keep it simple as requested
                return prevWishlist;
            }
            return [
                ...prevWishlist,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                },
            ];
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId: number) => {
        return wishlist.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                isWishlistOpen,
                setIsWishlistOpen,
                wishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
