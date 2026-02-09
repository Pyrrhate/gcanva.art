import { useState, useEffect } from 'react';

interface DraggableItem {
  id: number;
  text: string;
}

const AreYouHuman = () => {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: 1, text: 'WORK' },
    { id: 2, text: 'BUY' },
    { id: 3, text: 'CONSUME' },
    { id: 4, text: 'DIE' },
    { id: 5, text: 'REPEAT' },
  ]);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [message, setMessage] = useState('');

  const correctOrder = ['WORK', 'BUY', 'CONSUME', 'DIE', 'REPEAT'];

  const handleDragStart = (e: React.DragEvent<HTMLDiv>, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDiv>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDiv>, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === targetIndex) return;

    const newItems = [...items];
    [newItems[draggedIndex], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[draggedIndex],
    ];

    setItems(newItems);
    setDraggedItem(null);
  };

  const handleValidate = () => {
    const currentOrder = items.map(item => item.text);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

    if (isCorrect) {
      setIsValidated(true);
      setMessage('✓ VALIDÉ. BIENVENUE DANS LA MACHINE.');
    } else {
      setMessage('✗ ORDRE INVALIDE. RÉESSAYEZ.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReset = () => {
    setItems([
      { id: 1, text: 'WORK' },
      { id: 2, text: 'BUY' },
      { id: 3, text: 'CONSUME' },
      { id: 4, text: 'DIE' },
      { id: 5, text: 'REPEAT' },
    ]);
    setIsValidated(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: '#0a0a0a',
      backgroundImage: `
        linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
      `,
      backgroundSize: '50px 50px',
    }}>
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '400px 400px',
      }}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Error message top-left */}
        <div className="fixed top-4 left-4 text-[10px] font-mono text-gray-500 space-y-0">
          <div>ERROR: timeout</div>
          <div>OFFENDING COMMAND: timeout</div>
          <div>STACK:</div>
        </div>

        {/* Main container */}
        <div className="w-full max-w-2xl space-y-12">
          {/* Instructions box */}
          <div className="border-2 border-gray-600 bg-black/70 p-6 backdrop-blur">
            <div className="text-center text-xs md:text-sm font-mono tracking-wider text-gray-300">
              PUT THE WORDS IN THE RIGHT BOXES
            </div>
          </div>

          {/* Draggable items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
                className={`
                  p-4 md:p-6 border-2 border-gray-700 bg-black/60 cursor-move
                  transition-all hover:border-gray-500 hover:bg-gray-900/60
                  ${draggedItem === item.id ? 'opacity-50 border-gray-400' : ''}
                  font-mono text-lg md:text-2xl font-bold text-gray-100 text-center
                  tracking-widest select-none
                `}
                style={{
                  transform: draggedItem === item.id ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleValidate}
              disabled={isValidated}
              className={`
                px-8 py-3 border-2 font-mono font-bold tracking-widest text-sm
                transition-all
                ${isValidated
                  ? 'border-green-900 bg-green-950/30 text-green-800 cursor-not-allowed'
                  : 'border-gray-500 bg-black/70 text-gray-100 hover:border-gray-300 hover:bg-gray-900/70'
                }
              `}
            >
              VALIDER
            </button>
            {isValidated && (
              <button
                onClick={handleReset}
                className="px-8 py-3 border-2 border-gray-500 bg-black/70 text-gray-100 hover:border-gray-300 hover:bg-gray-900/70 font-mono font-bold tracking-widest text-sm transition-all"
              >
                RÉINITIALISER
              </button>
            )}
          </div>

          {/* Messages */}
          {message && (
            <div className={`
              text-center font-mono font-bold tracking-widest text-sm
              ${isValidated ? 'text-green-400' : 'text-red-400'}
              animate-pulse
            `}>
              {message}
            </div>
          )}

          {/* Big title */}
          <div className="text-center mt-16 mb-8">
            <div className="text-4xl md:text-6xl font-bold font-mono tracking-widest text-gray-100/80 mb-4">
              ARE YOU
            </div>
            <div className="text-6xl md:text-8xl font-black font-mono tracking-widest text-gray-100 border-4 border-gray-700 bg-black/40 p-6 inline-block"
              style={{
                textShadow: '2px 2px 0px rgba(255,255,255,0.1)',
                letterSpacing: '0.2em',
              }}>
              HUMAN
            </div>
            <div className="text-sm md:text-base font-mono text-gray-600 mt-6 tracking-wider">
              ?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreYouHuman;
