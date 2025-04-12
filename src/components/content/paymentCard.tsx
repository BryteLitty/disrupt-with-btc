import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import DefaultText from './defaultText'

function PaymentCard() {
  return (
    <div className="mx-4 md:mx-20 lg:mx-52 py-10">
      <div className="rounded-2xl bg-darkGrayHue p-5 md:p-10">

        <DefaultText
          className="text-center text-[18px] md:text-[25px] font-nowy text-light dark:text-light mb-5"
          title="Payment Summary"
        />


        <div className="rounded-2xl bg-mouve p-5">
          <DefaultText
            className="text-start text-[14px] md:text-[18px] capitalize text-dark font-bold md:font-pop mb-2"
            title="Details "
          />
          <DefaultText
            className="text-start text-[14px] md:text-[18px] text-dark font-light md:font-pop"
            title="USDC 100"
          />
        </div>

        {/* Total Row */}
        <div className="flex justify-between items-center mt-10">
          <DefaultText
            className="text-start text-[14px] md:text-[18px] capitalize text-light font-bold md:font-pop"
            title="Total"
          />
          <DefaultText
            className="text-end text-[14px] md:text-[18px] text-light font-light md:font-pop"
            title="USDC 100"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mt-10 mb-3">
          <p className="text-light text-[13px] md:text-[16px] font-pop text-center md:text-left">
            By continuing, <span className="text-mouve">you agree to our Terms and Conditions</span>
          </p>
        </div>

        {/* Pay Button */}
        <Button
          className={buttonVariants({
            size: "sm",
            className:
              "w-full rounded-full font-pop capitalize text-[14px] md:text-[16px] py-5 md:py-6 px-4 border border-dark text-dark shadow-none bg-primary dark:border-light",
          })}
        >
          Connect Wallet to Pay
        </Button>
      </div>
    </div>
  );
}


export default PaymentCard