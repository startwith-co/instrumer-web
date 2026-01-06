'use client';

import { Button } from '@/components/ui/button';

const TestButtonsPage = () => {
  const variants = [
    'default',
    'destructive',
    'outline',
    'white',
    'secondary',
    'ghost',
    'link',
    'vendor',
    'vendorGray',
    'vendorBlack',
    'textBlue',
    'bgBlackGradient',
    'bgBlueGradient',
    'home',
    'category',
    'graySubmit',
  ] as const;

  const sizes = ['sm', 'default', 'lg', 'icon'] as const;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Button Variants Showcase</h1>

      {/* All Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">All Variants (Default Size)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3 p-4 border rounded-lg bg-white">
              <code className="text-sm text-gray-600 font-mono">variant=&quot;{variant}&quot;</code>
              <Button variant={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)} Button</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes with Default Variant */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Sizes (Default Variant)</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-3 p-4 border rounded-lg bg-white">
              <code className="text-sm text-gray-600 font-mono">size=&quot;{size}&quot;</code>
              <Button size={size}>{size === 'icon' ? '🔍' : `${size} Button`}</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Color Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Primary Color (#684DFF)</h2>
        <div className="flex flex-col gap-4 p-6 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg bg-primary"></div>
            <div>
              <p className="font-semibold">Primary Color</p>
              <code className="text-sm text-gray-600">#684DFF</code>
              <p className="text-sm text-gray-500">HSL: 250 100% 65%</p>
            </div>
          </div>
          <Button variant="default" className="w-fit">
            Default (Primary) Button
          </Button>
          <Button variant="default" size="lg" className="w-fit">
            Large Primary Button
          </Button>
          <Button variant="default" size="sm" className="w-fit">
            Small Primary Button
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" disabled>
            Disabled Default
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="destructive" disabled>
            Disabled Destructive
          </Button>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Interactive Examples</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="default" onClick={() => alert('Default clicked!')}>
              Click Me (Default)
            </Button>
            <Button variant="outline" onClick={() => alert('Outline clicked!')}>
              Click Me (Outline)
            </Button>
            <Button variant="destructive" onClick={() => alert('Destructive clicked!')}>
              Delete
            </Button>
          </div>
        </div>
      </section>

      {/* Full Width Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Full Width Buttons</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <Button variant="default" className="w-full">
            구매하기
          </Button>
          <Button variant="outline" className="w-full">
            가격 문의하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TestButtonsPage;
