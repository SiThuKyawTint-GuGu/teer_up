"use client";
// import * as yup from "yup";

// const validationSchema = yup.object({
//   firstName: yup.string().required("First Name is required!"),
//   lastName: yup.string().required("Last name is required!"),
// });

const FetchData = () => {
  // const count = useStore(state => state.count);
  // const increment = useStore(state => state.increment);
  // const decrease = useStore(state => state.decrement);

  // const { data, isLoading, error } = useApi("https://jsonplaceholder.typicode.com/posts");

  // const form = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  // const onSubmit = (data: any) => {
  //   console.log("data -> ", data);
  // };

  return (
    <div className="grid grid-cols-12">
      {/* <div className="col-span-12">
        count: {count}
        <Button onClick={increment}>Increase</Button>
        <Button onClick={decrease}>Decrement</Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Name</FormLabel>
                  <FormControl>
                    <InputText placeholder="Channel name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Name</FormLabel>
                  <FormControl>
                    <InputText placeholder="Channel name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div> */}
    </div>
  );
};

export default FetchData;
