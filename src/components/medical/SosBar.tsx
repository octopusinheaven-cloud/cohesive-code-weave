import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SosBar = () => {
  const [keyPresses, setKeyPresses] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'v') {
        setKeyPresses(prev => {
          const newPresses = [...prev, 'v'].slice(-2);
          if (newPresses.length === 2 && newPresses.every(key => key === 'v')) {
            triggerSos();
            return [];
          }
          return newPresses;
        });
        
        // Clear after 2 seconds if not completed
        setTimeout(() => {
          setKeyPresses(prev => prev.slice(1));
        }, 2000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const triggerSos = () => {
    toast({
      title: "🚨 Emergency Alert Activated",
      description: "Emergency services have been notified. Help is on the way!",
      variant: "destructive",
    });
    
    // In a real app, this would trigger actual emergency services
    console.log("SOS Alert triggered!");
  };

  return (
    <div className="bg-destructive text-destructive-foreground font-bold p-3 text-center rounded-lg shadow-[var(--shadow-emergency)] sticky top-0 z-50">
      <Button
        variant="ghost"
        onClick={triggerSos}
        className="text-destructive-foreground hover:bg-destructive-foreground/20 p-2 h-auto"
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        🚨 SOS — Press <kbd className="bg-destructive-foreground/20 px-2 py-1 rounded">V</kbd> twice or tap here
        <Phone className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};