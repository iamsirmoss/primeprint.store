import { Icon } from '@iconify/react/dist/iconify.js'
import { IconCode } from '@tabler/icons-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Simplebar from 'simplebar-react'
import { useContext } from 'react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { useCustomizer } from '@/hooks/use-customizer'

const CodeDialog = ({ children }: any) => {
  const { isBorderRadius } = useCustomizer()

  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 5000)
    })
  }

  return (
    <div
      className='px-6 py-2 bg-gray-100 dark:bg-white/2 border-t border-border dark:border-darkborder'
      style={{
        borderBottomLeftRadius: `${isBorderRadius}px`,
        borderBottomRightRadius: `${isBorderRadius}px`,
      }}>
      <div
        className={`flex items-center ${isOpen ? 'justify-between' : 'justify-end'
          }`}>
        <h5
          className={`text-base text-dark font-semibold dark:text-white ${isOpen ? 'block' : 'hidden'
            }`}>
          Sample Code
        </h5>
        <TooltipProvider>
          <div className='flex items-center gap-2'>
            {/* Show/Hide Code Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='group'>
                  <p className='text-xs border border-ld rounded-full hover:bg-lightprimary py-1 px-1.5'>
                    {isOpen ? 'Hide Code' : 'Show Code'}
                  </p>
                </button>
              </TooltipTrigger>
              <TooltipContent className='whitespace-nowrap'>
                {isOpen ? 'Hide Code' : 'Show Code'}
              </TooltipContent>
            </Tooltip>

            {/* Copy Code Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='p-2' onClick={handleCopy}>
                  {copied ? (
                    <Icon
                      icon='charm:tick'
                      width={20}
                      height={20}
                      className='text-primary'
                    />
                  ) : (
                    <Icon
                      icon='qlementine-icons:copy-16'
                      className='hover:text-primary'
                      width={20}
                      height={20}
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent className='whitespace-nowrap'>
                Copy Code
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div
        className={`code-modal rounded-md rounded-t-none p-0 my-3 bg-gray-100 dark:bg-transparent overflow-hidden ${isOpen ? 'block' : 'hidden'
          }`}>
        <Simplebar className='max-h-[400px]'>
          <SyntaxHighlighter language='jsx' style={vscDarkPlus}>
            {children}
          </SyntaxHighlighter>
        </Simplebar>
      </div>
    </div>
  )
}

export default CodeDialog