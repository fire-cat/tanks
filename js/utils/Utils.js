class Utils {
    static  checkCollision(object1, object2) {
        try {
            const bounds1 = object1.getBounds();
            const bounds2 = object2.getBounds();

            let result = bounds1.x < bounds2.x + bounds2.width
                && bounds1.x + bounds1.width > bounds2.x
                && bounds1.y < bounds2.y + bounds2.height
                && bounds1.y + bounds1.height > bounds2.y;
            return object2.active && result;
        } catch {
            return false;
        }
    }
}