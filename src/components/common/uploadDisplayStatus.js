import { motion } from "framer-motion";
export const UploadStatusDisplay = ({ uploadProgress }) => {
    const isUploaded = uploadProgress === 100;
  
    return (
      <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
        <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
          <motion.div className="rounded-md bg-gray-100 text-gray-600 font-semibold p-2">
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isUploaded ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Uploaded
                </motion.div>
              ) : (
                <motion.div>
                  <span
                    className={`
                      ${uploadProgress === '0' ? 'animate-pulse' : ''}
                    `}
                  >
                    {uploadProgress}
                  </span>
                </motion.div>
              )}
            </motion.span>
          </motion.div>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Cancel Upload
          </button>
        </div>
      </div>
    );
  };