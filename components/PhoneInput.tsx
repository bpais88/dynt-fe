import { FC } from "react";

import Input from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  value?: string | null;
  onChange: (e: string) => void;
  isError?: string | string[];
  className?: string;
};

const PhoneInput: FC<Props> = ({
  onChange: handleChange,
  value,
  isError,
  className,
}) => {
  return (
    <div className={className}>
      <label className="label">
        <span className="label-text">Phone</span>
      </label>
      <Input
        onChange={(e) => handleChange("+" + e)}
        value={value}
        dropdownClass="!bg-base-100 !rounded-md"
        searchClass="!bg-base-100 !rounded-md"
        placeholder="Enter phone number"
        country={"nl"}
        countryCodeEditable
        preferredCountries={["nl", "us", "gb"]}
        inputClass={`!input !pl-10 !w-full !input-bordered !input-sm !bg-base-100  ${
          isError ? "!border-error" : "!border-base-content/20"
        }  !rounded-lg !h-12`}
        containerClass="!rounded-lg  !shadow-sm !w-full "
        buttonClass={`!rounded-l-lg  !bg-base-100 !border-base-200 !border-r-0 !rounded-r-none ${
          !isError ? "!border-base-content/20" : "!border-error"
        } `}
      />
    </div>
  );
};

export default PhoneInput;
