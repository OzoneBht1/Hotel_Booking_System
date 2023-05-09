import React from "react";
import { useRetrievePaymentQuery } from "../../store/api/payment-slice";
import { useAppSelector } from "../../store/hooks";

interface IBillProps {
  secret: string;
}

const Bill = ({ secret }: IBillProps) => {
  const { paymentIntentId } = useAppSelector((state) => state.paymentRed);
  console.log(secret);
  const { data, isLoading, isError } = useRetrievePaymentQuery(
    paymentIntentId as string,
    {
      skip: !paymentIntentId,
    }
  );
  console.log(data);

  return <div>Bill</div>;
};

export default Bill;
