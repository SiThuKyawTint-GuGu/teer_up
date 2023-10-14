import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { useStore } from '@/lib/store';
import { useUpdateUser } from '@/services/user';
import { User } from '@/types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required!'),
});

const UserUpdateForm: React.FC<{ userId: string; row: User; setOpen: any }> = ({
  userId,
  row,
  setOpen,
}: {
  userId: string;
  row: User;
  setOpen: any;
}) => {
  const { trigger } = useUpdateUser(userId);
  const { toggleUpdated } = useStore(state => state);
  const form = useForm<{ name: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: row?.name || undefined,
    },
  });

  const submit = async (data: any) => {
    const submitData = {
      name: data?.name,
    };
    await trigger(submitData, {
      onSuccess: () => {
        toggleUpdated(true);
      },
    });
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <InputText placeholder="Email Address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="p-2 mt-[50px] rounded-md w-full text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
