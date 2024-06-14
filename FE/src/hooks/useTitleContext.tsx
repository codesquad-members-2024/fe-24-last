import React, { createContext, useState, ReactNode, useContext } from "react";

export interface TitleContextType {
    currentTitle: string;
    setCurrentTitle: (title: string) => void;
}

export const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const TitleProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentTitle, setCurrentTitle] = useState("");

    return (
        <TitleContext.Provider value={{ currentTitle, setCurrentTitle }}>
            {children}
        </TitleContext.Provider>
    );
};

export const useTitleContext = () => {
    const context = useContext(TitleContext);
    if (context === undefined) {
        throw new Error("useTitleContext must be used within a TitleProvider");
    }
    return context;
};