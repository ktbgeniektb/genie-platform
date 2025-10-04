import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Manage your application preferences
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Configuration options will be available here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
