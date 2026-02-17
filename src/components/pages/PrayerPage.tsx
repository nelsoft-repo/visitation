import { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { getDailyMystery, prayers, Mystery } from '@/data/prayers';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface Bead {
  id: number;
  type: 'our-father' | 'hail-mary' | 'glory-be' | 'mystery';
  prayer: string;
  mysteryIndex?: number;
}

export default function PrayerPage() {
  const [currentBead, setCurrentBead] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [dailyMystery, setDailyMystery] = useState<Mystery | null>(null);
  const [beads, setBeads] = useState<Bead[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const mystery = getDailyMystery();
    setDailyMystery(mystery);
    
    // Build the rosary structure
    const rosaryBeads: Bead[] = [];
    let id = 0;

    // Opening prayers
    rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.signOfCross.text });
    rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.apostlesCreed.text });
    rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.ourFather.text });
    
    // 3 Hail Marys for Faith, Hope, and Charity
    for (let i = 0; i < 3; i++) {
      rosaryBeads.push({ id: id++, type: 'hail-mary', prayer: prayers.hailMary.text });
    }
    rosaryBeads.push({ id: id++, type: 'glory-be', prayer: prayers.gloryBe.text });

    // 5 Decades
    for (let decade = 0; decade < 5; decade++) {
      // Announce mystery
      rosaryBeads.push({ 
        id: id++, 
        type: 'mystery', 
        prayer: mystery.mysteries[decade],
        mysteryIndex: decade 
      });
      
      // Our Father
      rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.ourFather.text });
      
      // 10 Hail Marys
      for (let i = 0; i < 10; i++) {
        rosaryBeads.push({ id: id++, type: 'hail-mary', prayer: prayers.hailMary.text });
      }
      
      // Glory Be and Fatima Prayer
      rosaryBeads.push({ id: id++, type: 'glory-be', prayer: prayers.gloryBe.text });
      rosaryBeads.push({ id: id++, type: 'glory-be', prayer: prayers.fatimaPrayer.text });
    }

    // Closing prayers
    rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.hailHolyQueen.text });
    rosaryBeads.push({ id: id++, type: 'our-father', prayer: prayers.finalPrayer.text });

    setBeads(rosaryBeads);
  }, []);

  const handleBeadClick = (index: number) => {
    setCurrentBead(index);
    if (index === beads.length - 1) {
      setIsComplete(true);
    }
  };

  const handleNext = () => {
    if (currentBead < beads.length - 1) {
      setCurrentBead(currentBead + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentBead(0);
    setIsComplete(false);
  };

  const currentBeadData = beads[currentBead];
  const progress = ((currentBead + 1) / beads.length) * 100;

  if (!dailyMystery || beads.length === 0) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-8 p-8 rounded-lg bg-gradient-to-r ${dailyMystery.color}`}>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            {dailyMystery.name}
          </h1>
          <p className="text-muted-foreground">
            Today's Mystery • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prayer Display */}
          <Card className="p-8 bg-white">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  Bead {currentBead + 1} of {beads.length}
                </Badge>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="audio" 
                    checked={audioEnabled}
                    onCheckedChange={setAudioEnabled}
                  />
                  <Label htmlFor="audio" className="flex items-center gap-2 cursor-pointer">
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    Audio
                  </Label>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 mb-6">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {isComplete ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                  Prayer Complete
                </h2>
                <p className="text-muted-foreground mb-6">
                  May the Lord bless you and keep you.
                </p>
                <Button onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Pray Again
                </Button>
              </div>
            ) : (
              <>
                {currentBeadData.type === 'mystery' && (
                  <div className="mb-6 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                    <p className="text-sm font-semibold text-accent-foreground mb-1">
                      {currentBeadData.mysteryIndex !== undefined && 
                        `${currentBeadData.mysteryIndex + 1}${['st', 'nd', 'rd', 'th', 'th'][currentBeadData.mysteryIndex]} Mystery`
                      }
                    </p>
                    <p className="text-lg font-serif text-primary">
                      {currentBeadData.prayer}
                    </p>
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentBeadData.prayer}
                  </p>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button 
                    onClick={handleNext}
                    className="flex-1"
                    size="lg"
                  >
                    Next Bead
                  </Button>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </Card>

          {/* Rosary Visual */}
          <div className="space-y-6">
            <Card className="p-6 bg-white">
              <h3 className="font-semibold text-lg mb-4">The Five Mysteries</h3>
              <div className="space-y-3">
                {dailyMystery.mysteries.map((mystery, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border transition-all ${
                      currentBeadData?.mysteryIndex === index
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-background'
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {index + 1}. {mystery}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="font-semibold text-lg mb-4">Rosary Beads</h3>
              <div className="flex flex-wrap gap-2">
                {beads.map((bead, index) => (
                  <button
                    key={bead.id}
                    onClick={() => handleBeadClick(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      index === currentBead
                        ? 'bg-primary border-primary scale-125'
                        : index < currentBead
                        ? 'bg-primary/30 border-primary/30'
                        : 'bg-background border-border hover:border-primary/50'
                    }`}
                    title={`Bead ${index + 1}`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}