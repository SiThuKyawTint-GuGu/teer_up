'use client';
import React from 'react';
import Image from 'next/image';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { Icons } from '@/components/ui/Images';
import { actionMenu, menuList } from '@/shared/data/Menu';
// import { Switch } from '@/components/ui/switch';
// import useAtomReducer from '@/hooks/useAtomReducer';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

const Sidebar: React.FC<Props> = ({ className }: Props) => {
  const [open, setOpen] = React.useState<string | null>('/admin/innovates/projects');
  const [childActive, setChildActive] = React.useState<string>('/admin/innovates/projects');
  const router = useRouter();
  const { setTheme }: { setTheme: (theme: string) => void } = useTheme();
  // const { items } = useAtomReducer(TYPES.SWITCH_THEME);

  const handleCollapse = (key: any, item: any) => {
    if (!item.child.length) {
      setChildActive(item.key);
      router.push(item.key);
    }
    if (open && key === open) {
      setOpen(null);
      return;
    }
    setOpen(key);
  };
  const handleClickChild = (key: string) => {
    setChildActive(key);
    router.push(key);
  };

  return (
    <>
      <div
        className={cn(
          'lg:w-[260px] h-screen bg-default-light dark:bg-default-dark relative',
          className
        )}
      >
        <div className="px-12 pt-[25px] font-semibold mb-8 flex justify-start items-center gap-x-3">
          {/* <Icons.logo className="w-[60px] h-[60px]" /> */}
          {/* Wallet */}
          <Image src="/mainLogo.png" width={200} height={70} alt="main logo" />
        </div>
        <div className="space-y-[5px]">
          {menuList?.length &&
            menuList?.map((item, index) => {
              let active = childActive;
              if (!item.child) {
                active = active?.split('-')[0];
              }
              return (
                <Collapsible
                  key={index}
                  className="px-[25px] py-[10px] cursor-pointer hover:menu-theme"
                  open={open === item.key}
                  onOpenChange={() => handleCollapse(item.key, item)}
                >
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        'flex rounded-18 hover:bg-secondary-100 hover:text-secondary-800 align-middle justify-between',
                        active === item.key
                          ? 'text-secondary-800 bg-secondary-100 font-semibold text-red-500'
                          : ''
                      )}
                    >
                      <div className="flex justify-center items-center gap-x-[15px] mb-2">
                        <div>{item.icon}</div>
                        <div>{item.title}</div>
                      </div>
                      {item.child && item.child.length > 0 && (
                        <button>
                          {open === item.key ? (
                            <Icons.caretUp className="w-[20px] h-[20px]" />
                          ) : (
                            <Icons.caretDown className="w-[20px] h-[20px]" />
                          )}
                        </button>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.child &&
                      item.child.length > 0 &&
                      item.child.map((itemChild, index) => (
                        <div
                          onClick={() => handleClickChild(`${itemChild.key}`)}
                          key={index}
                          className={`
                            ${
                              active === `${itemChild.key}`
                                ? 'text-secondary-800 bg-secondary-100 font-semibold text-red-500'
                                : ''
                            }
                            ml-7 flex gap-16 cursor-pointer p-3 rounded-18
                          `}
                        >
                          {itemChild.icon}
                          {itemChild.title}
                        </div>
                      ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
        </div>
        <div className="space-y-[5px] mt-[50px] pt-[30px] border-t-[1px]">
          {actionMenu?.length &&
            actionMenu?.map((item, index) => {
              let active = childActive;
              if (!item.child) {
                active = active?.split('-')[0];
              }
              return (
                <Collapsible
                  key={index}
                  className="px-[25px] py-[5px] cursor-pointer hover:menu-theme"
                  open={open === item.key}
                  onOpenChange={() => handleCollapse(item.key, item)}
                >
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        'flex rounded-18 hover:bg-secondary-100 hover:text-secondary-800 align-middle justify-between',
                        active === item.key
                          ? 'text-secondary-800 bg-secondary-100 font-semibold'
                          : ''
                      )}
                    >
                      <div className="flex justify-center items-center gap-x-2">
                        <div>{item.icon}</div>
                        <div>{item.title}</div>
                      </div>
                      {item.child && item.child.length > 0 && (
                        <button>
                          {open === item.key ? (
                            <Icons.caretUp className="w-24 h-24" />
                          ) : (
                            <Icons.caretDown className="w-24 h-24" />
                          )}
                        </button>
                      )}
                    </div>
                  </CollapsibleTrigger>
                </Collapsible>
              );
            })}
        </div>
        {/* <div className="absolute lg:bottom-7 lg:left-[25px] maxMd:top-[20px] maxMd:right-[20px]">
          <Switch
            label={items.switchTheme ? 'Switch to light' : 'Switch to dark'}
            setTheme={setTheme}
          />
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
