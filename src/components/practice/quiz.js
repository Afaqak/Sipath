import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import UserAvatar from '@/components/common/userAvatar';
import { useSession } from 'next-auth/react';
import { EditQuizModal } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '../ui/badge';
import { BuyNowModal } from '../modals/paymentModal';
import { SuccessfullPurchaseModal } from '../modals/successfullPurchaseModal';
import { redirectToCheckout, initializeStripe } from '@/utils/stripeUtils';
import useAxios from '@/hooks/useAxios';

export const Quiz = ({ quiz, isEdit }) => {
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);
  const axios = useAxios()
  const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : "";
  const baseUrlWithoutQueryParams = currentUrl.split('?')[0];
  const [stripe, setStripe] = useState(null);
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [openPurchase, setOpenPurchase] = useState(false)



  useEffect(() => {
    initializeStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);



  useEffect(() => {
    if (session_id) {

      setPurchase();
    }
  }, [session_id]);

  const setPurchase = async () => {

    try {
      await axios.post(`/purchases?session_id=${session_id}`, {
        asset_id: quiz?.id,
        asset_type: "quiz"
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      router.replace(baseUrlWithoutQueryParams)
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 2500);

    } catch (err) {
      console.log('Error in setPurchase:', err);
    }
  };




  async function onBuySubmit(onDone) {
    try {

      const response = await axios.post("/purchases/create-checkout-session?type=quiz", {
        asset_id: quiz?.id,
        return_url: currentUrl
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      const { sessionId } = response.data;
      await redirectToCheckout(stripe, sessionId);

    } catch (err) {
      console.log(err)
    } finally {
      if (onDone && typeof onDone === 'function') {
        onDone()
      }
    }
  }


  return (
    <div
      className={`${isEdit && 'border-subcolor border-2'
        } mt-4 flex md:flex-row border flex-col md:items-center -z-10 justify-between bg-white rounded-lg shadow-lg`}
    >

      <div className="flex md:flex-row  relative md:max-w-[20%] items-center flex-col">
        <div className="h-44 relative md:h-28 w-44 rounded-lg border">
          <Image
            src={quiz?.thumbnail}
            alt="demo-4"
            className="h-full w-full object-cover rounded-md"
            width={100}
            height={100}
          />
          {
            quiz?.price && quiz?.price > 0
            &&
            <Badge className={'bg-subcolor absolute left-2 top-2'}>
              {quiz?.price} $
            </Badge>
          }
        </div>
        <div className="bottom-2 md:right-0 md:top-1/2 md:-translate-y-1/2  right-4 md:translate-x-5  absolute ">
          <UserAvatar user={{
            image: user?.tutor?.tutor_id === +quiz?.tutor_id ? user?.user?.profile_image : quiz?.['tutor.user.profile_image'],
            name: quiz?.['tutor.user.display_name'].slice(0, 1)
          }} />
        </div>
      </div>
      <div className="flex justify-between flex-1 flex-col px-3 mb-3 md:px-0 md:mb-0 md:flex-row">
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-8">
          <div>
            <h1 className="font-semibold md:text-lg text-base">{quiz?.title}</h1>
            <p>{user?.user?.display_name}</p>
          </div>
        </div>
        <div className="flex md:flex-row items-center flex-col md:px-4  gap-2">
          <div
            className="flex gap-1 flex-row justify-between items-center md:justify-end md:flex-col text-sm
      "
          >
            <h2 className="font-extrabold gap-1 flex items-center">
              4.7 <Image alt='image-rating' src="/svgs/star.png" className="" width={24} height={24} />
            </h2>
            <p className="text-gray-600 text-[0.8rem] font-medium flex gap-1">
              {' '}
              24K <span>Views</span>
            </p>
          </div>
          {isEdit ? (
            <Button
              onClick={() => setOpen(!open)}
              variant="outline"
              className=" border-2 text-black cursor-pointer bg-white border-black"
            >
              Edit Quiz
            </Button>
          ) : (
            <div className="flex flex-col gap-2 text-sm lg:text-base sel justify-end">
              {
                user?.tutor?.tutor_id === +quiz?.tutor_id
                  ?
                  <>
                    <Button
                      onClick={() => router.push(`/practice/view-quiz/${quiz?.id}`)}
                      variant="outline"
                      className=" border-2 text-black bg-white border-black"
                    >
                      View Quiz
                    </Button>
                    <Button onClick={() => router.push(`/practice/view-quiz-solution/${quiz?.id}`)} variant="outline" className=" text-subcolor bg-white border-subcolor">
                      View Solutions
                    </Button>
                  </>
                  :
                  quiz.price <= 0 ?
                    <>
                      <Button
                        onClick={() => router.push(`/practice/view-quiz/${quiz?.id}`)}
                        variant="outline"
                        className=" border-2 text-black bg-white border-black"
                      >
                        View Quiz
                      </Button>
                      <Button onClick={() => router.push(`/practice/view-quiz-solution/${quiz?.id}`)} variant="outline" className=" text-subcolor bg-white border-subcolor">
                        View Solutions
                      </Button>
                    </> :
                    <Button onClick={() => setOpenPurchase(true)}>Buy Now!</Button>

              }

            </div>
          )}
        </div>
      </div>
      <SuccessfullPurchaseModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} />
      <EditQuizModal isOpen={open} setIsOpen={setOpen} quiz={quiz} />
      <BuyNowModal onBuyNowSubmit={onBuySubmit} productName={quiz?.title} productPrice={quiz?.price} isOpen={openPurchase} setIsOpen={setOpenPurchase} />
    </div>
  );
};
