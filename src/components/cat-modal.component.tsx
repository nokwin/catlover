import { Modal } from 'flowbite-react';
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useSingleCatData } from '../api/use-single-cat-data-hook';
import { Button } from './button.component';
import { useLikeApi } from '../api/use-like-api.hook';
import { filterSearchParams } from '../utils/search-params';

interface CatModalProps {}

export const CatModal: FC<CatModalProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const cat = searchParams.get('cat');
  const { data, isLoading } = useSingleCatData({ id: cat });
  const {
    like,
    dislike,
    isLiked,
    isLoading: isLikeLoading,
  } = useLikeApi({ catId: cat });

  useEffect(() => {
    setIsOpened(!!cat);
  }, [cat]);

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'cat');

    setSearchParams(paramsObject);
  };

  const handleLikeButton = () => {
    if (isLiked) {
      dislike();
    } else {
      like();
    }
  };

  const handleLearnMore = (breedId: string) => {
    setSearchParams({
      breed: breedId,
    });
  };

  return (
    <Modal show={isOpened} onClose={closeModal}>
      <Modal.Header>
        {isLoading
          ? 'Loading...'
          : data?.breeds?.map((b) => b.name).join(',') || 'Cute kitty'}
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-6">
          {data?.url && (
            <div className="relative">
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  onClick={handleLikeButton}
                  isLoading={isLikeLoading}
                >
                  {isLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-white" />
                  ) : (
                    <HeartIconOutline className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
              <img src={data?.url} />
            </div>
          )}

          {data?.breeds && (
            <>
              <p>{data.breeds[0].description}</p>
              <Button
                onClick={() =>
                  handleLearnMore(data.breeds ? data.breeds[0].id : '')
                }
              >
                Learn more
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
