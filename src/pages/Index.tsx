
import { Hero } from '@/components/Hero';
import { ValueColumns } from '@/components/ValueColumns';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { MainLayout } from '@/layouts/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <ValueColumns />
      <InteractiveDemo />
      <KnowledgeBase />
    </MainLayout>
  );
};

export default Index;
