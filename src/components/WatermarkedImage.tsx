import Image, { ImageProps } from 'next/image';
import styles from './WatermarkedImage.module.css';

interface Props extends Omit<ImageProps, 'src'> {
    src: string;
    watermarkText?: string;
}

export default function WatermarkedImage({ src, alt, watermarkText = "Les Délices Sucrés", className, ...props }: Props) {
    const isFill = props.fill === true;

    return (
        <div
            className={`${styles.container} ${className || ''}`}
            style={{
                position: 'relative',
                width: isFill ? '100%' : (props.width || '100%'),
                height: isFill ? '100%' : (props.height || 'auto')
            }}
        >
            <Image
                src={src}
                alt={alt}
                {...props}
            />
            <div className={styles.watermark}>{watermarkText}</div>
            <div className={styles.repeatedWatermark} />
        </div>
    );
}
