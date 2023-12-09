'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import UserAvatar from './userAvatar';
import { successToast, errorToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { setBooks } from '@/features/book/bookSlice';
import { useDispatch } from 'react-redux';
import { EditBookModal, Icons, Stars } from '@/components';
import { useParams, useSearchParams } from 'next/navigation';
import { initializeStripe ,redirectToCheckout} from '@/utils/stripeUtils';
import { SuccessfullPurchaseModal } from '../modals/successfullPurchaseModal';
import { BuyNowModal } from '../modals/paymentModal';
import { useSession } from 'next-auth/react';


export const Book = ({ book,  isProfile, user }) => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch()
  const {data:session}=useSession()

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/assets/books/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      dispatch(setBooks([]))
      dispatch(setBooks(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);

  const getBook = async (id) => {
    try {
      const response = await axios.get(`/assets/books/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      })

      const signedUrl = response?.data?.signed_url;
      console.log(signedUrl)

      if (signedUrl) {
        window.open(signedUrl, '_blank')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setAssetRating = async (newRating) => {

    try {
      await axios.post(
        `/rate/${book?.id}?type=book`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      fetchBooks()

      successToast('You have rated the Video!');
    } catch (error) {
      errorToast('Error Occured while setting the rating!');
    }
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setAssetRating(newRating);
  };


  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')
  const params = useParams()
  const currentUrl = window.location.href;
  const baseUrlWithoutQueryParams = currentUrl.split('?')[0];
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    initializeStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  useEffect(() => {
    if (session_id) {
      console.count('Session ID is not null:', session_id);
      setPurchase();
    }
  }, [session_id]);

  const setPurchase = async () => {

    try {
      const response = await axios.post(`/purchases?session_id=${session_id}`, {
        asset_id: params.id,
        asset_type: "book"
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
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

  const onBuyNowSubmit = async (onDone) => {
    try {

      const response = await axios.post("/purchases/create-checkout-session?type=book", {
        asset_id: book?.id,
        return_url: baseUrlWithoutQueryParams
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
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
    <div className="bg-white p-6 md:h-[243.198px] relative flex-col md:flex-row shadow-xl rounded-md flex gap-4 md:w-full">
      {book?.price && book?.price > 0 && (
        <span className="absolute top-4 tracking-wide z-[1000] left-0 bg-green-700 py-[0.10rem] shadow-xl rounded-r-sm text-sm text-white px-5 font-medium">
          {book?.price}$
        </span>
      )}
      <div className="md:w-52 bg-gray-300 h-[195.198px] flex items-center justify-center w-[100%]">
        <Image
          src={book?.thumbnail}
          className=" object-contain h-full w-full"
          width={500}
          alt="physics"
          height={500}
        />
      </div>
      <div
        className={`flex justify-between  h-full flex-col lg:w-full ${isProfile ? 'md:w-full' : 'md:w-90%'
          }`}
      >

        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-[1.08rem] font-medium capitalize">{book?.title}</h1>
            <div className="flex text-sm font-bold text-black gap-2">
              {book?.rating > 0 ? book.rating.slice(0, -1) : <span>0</span>}

              <Image src={'/svgs/star.svg'} width={20} height={20} alt="star" />
            </div>
          </div>
       
          <div className="flex justify-between">
            <div className="flex gap-1 items-center text-sm">
              <UserAvatar className="h-8 w-8" user={{ image: user?.profile_image }} />
              {user?.display_name}
            </div>
            {isProfile ? (
              <Stars rating={rating} setRating={handleRatingChange} initialRating={book?.rating} />
            ) : (
              ''
            )}
          </div>
          <div className="text-[0.8rem] md:text-sm line-clamp-4 mb-3 mt-2">
            <p className="text-subcolor3 font-thin">{book?.description}</p>
          </div>
        </div>
        {isProfile ? (
          <div className="flex gap-4 w-full">
            <Button
              onClick={() => getBook(book?.id)}
              variant='outline'
              className="font-semibold bg-white text-subcolor3 justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor3"
            >
              <Image width={20} height={20} alt="bag" className='mt-1' src={'/svgs/visibility.svg'} />

              <span>View Book</span>
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="font-semibold bg-white text-subcolor justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor"
            >
              <Icons.edit2 className="stroke-subcolor h-5 w-5" />

              <span>Edit Book</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            className="font-semibold bg-white text-subcolor justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor"
          >
            <Image width={20} height={20} alt="bag" src={'/svgs/bag.svg'} />

            <span>Buy Book</span>
          </Button>
        )}
      </div>
      <EditBookModal book={book} isOpen={open} setIsOpen={setOpen} />

      <SuccessfullPurchaseModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} />
      <BuyNowModal onBuyNowSubmit={onBuyNowSubmit} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};