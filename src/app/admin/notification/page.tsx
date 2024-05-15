import NotificationTable from "@/page-containers/admin/notification";

const Notification = () => {
  return (
    <div className="px-2 pt-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
      <NotificationTable />
    </div>
  );
};

export default Notification;
