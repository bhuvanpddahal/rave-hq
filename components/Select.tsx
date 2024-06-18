"use client";

import CreatableSelect from "react-select/creatable";
import { useMemo } from "react";
import { SingleValue } from "react-select";

type Props = {
    onChange: (value?: string) => void,
    onCreate?: (value: string) => void,
    options?: { label: string, value: string }[],
    value?: string | null,
    disabled?: boolean,
    placeholder?: string
};

const Select = ({
    onChange,
    onCreate,
    options = [],
    value,
    disabled,
    placeholder
}: Props) => {
    const onSelect = (
        option: SingleValue<{ label: string, value: string }>
    ) => {
        onChange(option?.value);
    };

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);

    return (
        <CreatableSelect
            placeholder={placeholder}
            className="text-sm h-10"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover": {
                        borderColor: "#e2e8f0"
                    }
                })
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary75: "#f78145",
                    primary50: "#fcaf88",
                    primary25: "#fcf2ed",
                    primary: "#f54e00"
                }
            })}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    )
};

export default Select;