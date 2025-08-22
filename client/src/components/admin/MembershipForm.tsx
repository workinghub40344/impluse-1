import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { type MembershipPlan } from "@/pages/AdminMembershipPage";

// The form will handle the data, but not the submission logic itself.
export type MembershipFormData = Omit<MembershipPlan, "_id">;

interface MembershipFormProps {
  onSave: (data: MembershipFormData) => void;
  onCancel: () => void;
  planToEdit?: MembershipPlan | null;
}

const MembershipForm = ({ onSave, onCancel, planToEdit }: MembershipFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [originalPrice, setOriginalPrice] = useState<number | string>("");
  const [duration, setDuration] = useState<"monthly" | "quarterly" | "yearly" | "">("");
  const [features, setFeatures] = useState("");
  const [popular, setPopular] = useState(false);
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (planToEdit) {
      setName(planToEdit.name);
      setPrice(planToEdit.price);
      setOriginalPrice(planToEdit.originalPrice || "");
      setDuration(planToEdit.duration);
      setFeatures(planToEdit.features.join("\n"));
      setPopular(planToEdit.popular || false);
      setColor(planToEdit.color || "");
      setIcon(planToEdit.icon || "");
    } else {
      // Reset form for new entry
      setName("");
      setPrice("");
      setOriginalPrice("");
      setDuration("");
      setFeatures("");
      setPopular(false);
      setColor("");
      setIcon("");
    }
  }, [planToEdit]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: MembershipFormData = {
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      duration: duration as "monthly" | "quarterly" | "yearly",
      features: features.split("\n").filter((f) => f.trim() !== ""),
      popular,
      color,
      icon,
    };
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Plan Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="originalPrice">Original Price (Optional)</Label>
          <Input id="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Select value={duration} onValueChange={(value: string) => setDuration(value as 'monthly' | 'quarterly' | 'yearly')} required>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="icon">Icon Name (e.g., Zap)</Label>
          <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
        </div>
      </div>
       <div>
        <Label htmlFor="color">Color Gradient (e.g., from-primary to-secondary)</Label>
        <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          placeholder="- Feature 1&#x0a;- Feature 2&#x0a;- Feature 3"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>
       <div className="flex items-center space-x-2">
        <Checkbox id="popular" checked={popular} onCheckedChange={(checked) => setPopular(checked as boolean)} />
        <Label htmlFor="popular" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Mark as Popular
        </Label>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Plan</Button>
      </div>
    </form>
  );
};

export default MembershipForm;
