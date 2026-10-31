import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function replaceExactly(filePath, from, to, expected = 1) {
  const source = readFileSync(filePath, 'utf8')
  const count = source.split(from).length - 1
  if (count !== expected) {
    throw new Error(`Expected ${expected} occurrence(s) in ${filePath}, found ${count}: ${from}`)
  }
  writeFileSync(filePath, source.split(from).join(to))
}

const logoPath = join(root, 'src/components/Logo.tsx')
const logoSource = readFileSync(logoPath, 'utf8')
const logoMarker = 'export function Logo({'
const logoStart = logoSource.indexOf(logoMarker)
if (logoStart < 0) throw new Error('Could not find Logo component in Logo.tsx')

const updatedLogo = `export function Logo({
  tone = 'forest',
  className = '',
  size = 'default',
}: {
  tone?: 'ivory' | 'forest'
  className?: string
  size?: 'default' | 'large'
}) {
  const ivory = tone === 'ivory'
  const large = size === 'large'

  return (
    <span
      className={[
        'inline-flex items-center',
        large ? 'gap-4 sm:gap-6' : 'gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <LogoMark
        tone={tone}
        className={[
          large ? 'h-16 w-16 sm:h-[5.5rem] sm:w-[5.5rem]' : 'h-11 w-11',
          'shrink-0',
        ].join(' ')}
      />
      <span className="flex flex-col leading-none">
        <span
          className={[
            large ? 'text-[0.9rem] sm:text-[1.32rem]' : 'text-[0.66rem]',
            'font-semibold uppercase tracking-[0.24em]',
            ivory ? 'text-sage-300' : 'text-sage-700',
          ].join(' ')}
        >
          Northern Virginia
        </span>
        <span
          className={[
            'font-display font-medium',
            large ? 'mt-1 sm:mt-2 text-[1.8rem] sm:text-[2.84rem]' : 'mt-1 text-[1.42rem]',
            ivory ? 'text-ivory-50' : 'text-forest-800',
          ].join(' ')}
        >
          Tree Help
        </span>
      </span>
    </span>
  )
}
`

writeFileSync(logoPath, logoSource.slice(0, logoStart) + updatedLogo)

const headerPath = join(root, 'src/components/SiteHeader.tsx')
replaceExactly(headerPath, 'h-20 max-w-7xl', 'h-24 sm:h-28 max-w-7xl')
replaceExactly(headerPath, '<Logo tone={solid ? \'forest\' : \'ivory\'} />', '<Logo tone={solid ? \'forest\' : \'ivory\'} size="large" />')
replaceExactly(headerPath, 'hidden lg:block', 'hidden xl:block')
replaceExactly(headerPath, 'hidden items-center gap-5 lg:flex', 'hidden items-center gap-5 xl:flex')
replaceExactly(headerPath, 'lg:hidden', 'xl:hidden', 2)

const shellPath = join(root, 'src/components/PageShell.tsx')
replaceExactly(shellPath, 'pt-20', 'pt-24 sm:pt-28')

console.log('Updated header brand mark and wordmark to approximately double size on desktop, with responsive sizing on mobile.')
