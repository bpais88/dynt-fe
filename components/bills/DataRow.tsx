import { getCurrencyIcon } from "@/utils/helper";
import { createId } from "@paralleldrive/cuid2";
import React, { ChangeEvent, FC } from "react";
import { RxCross1 } from "react-icons/rx";

export type DataRowType = {
  amount: string | number;
  vat: string | number;
  description: string | null;
  quantity: number;
  confidence?: number;
};

const defaultRow: DataRowType = {
  amount: "",
  description: null,
  vat: "",
  quantity: 1,
};

type Props = {
  rows: [string, DataRowType | DataRowType][];
  setRows: React.Dispatch<
    React.SetStateAction<Record<string, DataRowType | DataRowType>>
  >;
  errors: Record<string, string | undefined>;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  currency: string;
};

const DataRow: FC<Props> = ({ rows, errors, setRows, currency, setErrors }) => {
  const handleValue =
    (id: string, key: keyof DataRowType) =>
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let { value } = target;
      const isNumber = ["amount", "vat", "quantity"].includes(key);

      //? check if a valid number without the negative sign
      if (isNumber && !!isNaN(+value.replace("-", "0"))) return;

      //? remove the leading zeros without the decimals when it's a number
      if (isNumber) value = value.replace(/^(-)?0+(?=\d+(\.\d+)?$)/, "");

      setRows((prev) => ({
        ...prev,
        [id]: { ...prev[id], [key]: value },
      }));

      setErrors((prev) => ({ ...prev, [id + key]: undefined }));
    };

  const addRow = () => {
    setRows((prev) => ({ ...prev, [createId()]: defaultRow }));
  };

  const removeRow = (id: string) => () => {
    setRows((prev) => {
      const { [id]: _, ...rest } = prev;
      return { ...rest };
    });
    const rowsLength = Object.keys(rows).length;
    if (rowsLength === 1) addRow();
  };
  return (
    <div className="grid gap-2">
      {rows.map(
        ([id, { amount, description, vat, quantity, confidence }], i) => (
          <>
            {!!i && <div className="divider divider-primary"></div>}
            <div className="lg:flex grid gap-3 relative" key={id}>
              {!!confidence && (
                <span className="btn btn-secondary absolute btn-xs -top-5 z-20 rounded-full -left-2">
                  confidence: {confidence}%
                </span>
              )}
              <div className="flex-[3] gap-3 flex items-center">
                <div className="grid w-full flex-[2] gap-3">
                  <div className="flex w-full">
                    <span
                      className={`btn w-12 btn-primary rounded-r-none ${
                        errors[id + "amount"] ? "btn-error" : ""
                      } `}
                    >
                      {getCurrencyIcon(currency)}
                    </span>
                    <input
                      onChange={handleValue(id, "amount")}
                      placeholder="e.g. 100"
                      value={amount}
                      type="text"
                      className={`flex-1 w-full input input-bordered rounded-l-none ${
                        errors[id + "amount"] ? "input-error" : ""
                      } `}
                    />
                  </div>
                  <div className="flex w-full">
                    <span
                      className={`btn btn-primary w-12 h-full rounded-r-none ${
                        errors[id + "vat"] ? "btn-error" : ""
                      } `}
                    >
                      VAT
                    </span>
                    <input
                      type="text"
                      value={vat}
                      onChange={handleValue(id, "vat")}
                      placeholder="e.g. 5%"
                      className={`flex-1 w-full input input-bordered rounded-l-none ${
                        errors[id + "amount"] ? "input-error" : ""
                      } `}
                    />
                  </div>
                </div>
                <div className="lg:hidden w-min h-full">
                  <div className="h-full flex flex-col">
                    <span
                      className={`btn btn-primary w-full rounded-b-none ${
                        errors[id + "quantity"] ? "btn-error" : ""
                      } `}
                    >
                      Quantity
                    </span>
                    <input
                      type="text"
                      value={quantity}
                      onChange={handleValue(id, "quantity")}
                      placeholder="e.g. 3"
                      className={`input input-bordered rounded-t-none text-center flex-1 w-full ${
                        errors[id + "quantity"] ? "input-error" : ""
                      } `}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-[5] relative">
                <button
                  className="btn btn-error btn-outline btn-circle absolute top-2 right-2 z-10 btn-xs"
                  onClick={removeRow(id)}
                >
                  <RxCross1 size={14} />
                </button>
                <textarea
                  value={description ?? ""}
                  placeholder="e.g. Digital service"
                  className={`flex-[5] resize-none w-full h-full textarea textarea-bordered ${
                    errors[id + "description"] ? "textarea-error" : ""
                  } `}
                  onChange={handleValue(id, "description")}
                />
              </div>
              <div className="flex-1 hidden lg:block h-full">
                <div className="h-full flex flex-col">
                  <span
                    className={`btn btn-primary w-full rounded-b-none ${
                      errors[id + "quantity"] ? "btn-error" : ""
                    } `}
                  >
                    Quantity
                  </span>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleValue(id, "quantity")}
                    placeholder="e.g. 3"
                    className={`input input-bordered rounded-t-none text-center flex-1 w-full ${
                      errors[id + "quantity"] ? "input-error" : ""
                    } `}
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}
      <button onClick={addRow} className="btn w-fit">
        <p className="  text-sm">Add an item</p>
      </button>
    </div>
  );
};

export default DataRow;
