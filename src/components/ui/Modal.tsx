import React, { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when the modal should close
   */
  onClose: () => void;

  /**
   * The size of the modal
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Whether to close the modal when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether to close the modal when pressing escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * The modal title
   */
  title?: React.ReactNode;

  /**
   * Custom header content
   */
  header?: React.ReactNode;

  /**
   * Custom footer content
   */
  footer?: React.ReactNode;

  /**
   * Additional CSS classes for the backdrop
   */
  backdropClassName?: string;

  /**
   * Additional CSS classes for the modal
   */
  className?: string;

  /**
   * The content of the modal
   */
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  title,
  header,
  footer,
  backdropClassName,
  className,
  children,
}: ModalProps) => {
  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Handle scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'fixed inset-0 bg-black/50 z-40',
              backdropClassName
            )}
            onClick={closeOnOutsideClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              role="dialog"
              aria-modal="true"
              className={cn(
                'relative bg-white rounded-lg shadow-xl w-full',
                'flex flex-col max-h-[calc(100vh-2rem)]',
                sizeClasses[size],
                className
              )}
            >
              {/* Header */}
              {(header || title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  {header ? (
                    header
                  ) : (
                    <>
                      {title && (
                        <h2 className="text-xl font-semibold text-gray-900">
                          {title}
                        </h2>
                      )}
                      {!title && showCloseButton && <div className="flex-grow"></div>}
                      {showCloseButton && (
                        <button
                          type="button"
                          className="p-2 -ml-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close</span>
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="px-6 py-4 border-t border-gray-200">
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}; 