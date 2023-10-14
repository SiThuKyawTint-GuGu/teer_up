import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { ParamsType, useGetUser, useUpdateUser } from '@/services/user';
import { USER_ROLE } from '@/shared/enums';
import { User, UserResponse } from '@/types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required!'),
});

const UserUpdateForm: React.FC<{
  userId: string;
  row: User;
  setOpen: (arg: boolean) => void;
  role: USER_ROLE;
}> = ({
  userId,
  row,
  setOpen,
  role,
}: {
  userId: string;
  row: User;
  setOpen: any;
  role: USER_ROLE;
}) => {
  const { mutate } = useGetUser<ParamsType, UserResponse>({
    role,
  });
  const { trigger } = useUpdateUser(userId);

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
        mutate();
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
