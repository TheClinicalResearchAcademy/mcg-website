import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerProps {
  message: string;
  type?: "info" | "success" | "warning" | "announcement";
  dismissible?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

export default function Banner({ 
  message, 
  type = "info", 
  dismissible = true, 
  ctaText, 
  ctaAction 
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getBannerStyles = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground";
      case "warning":
        return "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white";
      case "announcement":
        return "bg-gradient-to-r from-secondary via-primary to-accent text-primary-foreground";
      default:
        return "bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 text-primary-foreground";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "fas fa-check-circle";
      case "warning":
        return "fas fa-exclamation-triangle";
      case "announcement":
        return "fas fa-megaphone";
      default:
        return "fas fa-info-circle";
    }
  };

  return (
    <div className={`relative ${getBannerStyles()} py-3 px-4 shadow-lg z-40`} data-testid="announcement-banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <i className={`${getIcon()} text-lg`}></i>
          <p className="text-sm font-medium">{message}</p>
          {ctaText && ctaAction && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={ctaAction}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 ml-4"
              data-testid="banner-cta"
            >
              {ctaText}
            </Button>
          )}
        </div>
        
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1 h-auto"
            data-testid="banner-dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}